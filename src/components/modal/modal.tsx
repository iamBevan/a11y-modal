import React, { ReactNode, useEffect, useRef, RefObject } from "react"
import { createPortal } from "react-dom"
import styles from "./modal.module.scss"
import FocusLock from "react-focus-lock"

interface ModalProps {
	toggleModal: () => void
	children: ReactNode
	onClose: () => void
	isModalOpen: boolean
	innerRef: RefObject<HTMLDivElement>
	ariaLabel: string
}

const modalRoot = document.body

const Modal = ({
	children,
	isModalOpen,
	toggleModal,
	innerRef,
	ariaLabel,
}: ModalProps) => {
	const container = useRef<HTMLDivElement>(document.createElement("div"))
	const currentContainer = container.current

	useEffect(() => {
		if (isModalOpen) {
			modalRoot.appendChild(currentContainer)
		}

		return () => {
			currentContainer.parentNode?.removeChild(currentContainer)
		}
	}, [currentContainer, isModalOpen])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				toggleModal()
			}
		}

		if (isModalOpen) {
			document.addEventListener("keydown", handleKeyDown)
			return () => {
				document.removeEventListener("keydown", handleKeyDown)
			}
		}

		return
	}, [isModalOpen, toggleModal])

	const Wrapper = (): JSX.Element => {
		return (
			<>
				{isModalOpen && (
					<FocusLock>
						<div
							className={styles["modal"]}
							aria-modal='true'
							role='dialog'
							aria-label={ariaLabel}
							ref={innerRef}
							tabIndex={0}
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
					</FocusLock>
				)}
			</>
		)
	}

	return createPortal(Wrapper(), currentContainer)
}

export { Modal }
