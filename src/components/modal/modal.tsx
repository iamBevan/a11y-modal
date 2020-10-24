import React, {
	ReactNode,
	useEffect,
	useRef,
	RefObject,
	useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";

export interface ModalProps {
	children: ReactNode;
	onClose: () => void;
	isModalOpen: boolean;
	innerRef: RefObject<HTMLDivElement>;
	ariaLabel: string;
}
const elements =
	'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
const modalRoot = document.body;

const Modal = ({
	children,
	isModalOpen,
	innerRef,
	ariaLabel,
	onClose,
}: ModalProps) => {
	const container = useRef<HTMLDivElement>(document.createElement("div"));
	const currentContainer = container.current;
	const [lastActive, setLastActive] = useState<Element | null>(null);

	useEffect(() => {
		if (document.activeElement) setLastActive(document.activeElement);
	}, [isModalOpen]);

	useEffect(() => {
		const modalElements: Element[] = Array.from(
			container.current.querySelectorAll(elements)
		).filter(el => !el.hasAttribute("disabled"));

		const firstEl = modalElements[0] as HTMLElement;
		const lastEl = modalElements[modalElements.length - 1] as HTMLElement;

		const lastElKeyDown = (e: KeyboardEvent) => {
			if (!e.shiftKey && e.key === "Tab") {
				e.preventDefault();
				firstEl.focus();
			}
		};
		const firstElKeyDown = (e: KeyboardEvent) => {
			if (e.shiftKey && e.key === "Tab") {
				e.preventDefault();
				lastEl.focus();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isModalOpen) {
			modalRoot.appendChild(currentContainer);
			document.addEventListener("keydown", handleKeyDown);

			if (firstEl) {
				firstEl.focus();

				firstEl.onfocus = () => {
					currentContainer.addEventListener(
						"keydown",
						firstElKeyDown
					);
				};
				firstEl.onblur = () => {
					currentContainer.removeEventListener(
						"keydown",
						firstElKeyDown
					);
				};
				lastEl.onfocus = () => {
					currentContainer.addEventListener("keydown", lastElKeyDown);
				};
				lastEl.onblur = () => {
					currentContainer.removeEventListener(
						"keydown",
						lastElKeyDown
					);
				};
			}
		}

		return () => {
			currentContainer.parentNode?.removeChild(currentContainer);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [currentContainer, isModalOpen, onClose]);

	useEffect(() => {
		const returnFocus = () => {
			if (lastActive) {
				(lastActive as HTMLElement).focus();
			}
		};

		return () => {
			returnFocus();
		};
	}, [lastActive]);

	const Wrapper = (): JSX.Element => {
		return (
			<>
				{isModalOpen && (
					<>
						<div
							className={styles["modal"]}
							aria-modal='true'
							role='dialog'
							aria-label={ariaLabel}
							ref={innerRef}
							data-testid='modal'
						>
							<div className={styles["modal-body"]}>
								<div
									className={styles["modal-heading"]}
									role='main'
									aria-labelledby='Heading'
								>
									<h1>Payment Details</h1>
								</div>
								{children}
							</div>
						</div>
					</>
				)}
			</>
		);
	};

	return createPortal(Wrapper(), currentContainer);
};

export { Modal };
