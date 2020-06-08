import React, { ReactNode, useEffect, useRef, RefObject } from "react"
import { createPortal } from "react-dom"
import styles from "./modal.module.scss"
import useFocusTrap from "@charlietango/use-focus-trap"
// import FocusTrap from "focus-trap-react"

const modalRoot = document.body

const Modal = ({
	children,
	open,
	toggleModal,
	innerRef,
}: {
	toggleModal: () => void
	children: ReactNode
	onClose: () => void
	open: boolean
	innerRef: RefObject<HTMLDivElement>
}) => {
	const container = useRef<HTMLDivElement>(document.createElement("div"))
	const currentContainer = container.current
	const focusRef = useFocusTrap()

	useEffect(() => {
		if (open) {
			modalRoot.appendChild(currentContainer)
		}

		return () => {
			currentContainer.parentNode?.removeChild(currentContainer)
		}
	}, [currentContainer, open])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				toggleModal()
			}
		}

		if (open) {
			document.addEventListener("keydown", handleKeyDown)
			return () => {
				document.removeEventListener("keydown", handleKeyDown)
			}
		}

		return
	}, [open, toggleModal])

	const Wrapper = (): JSX.Element => {
		return (
			<aside
				className={styles["modal"]}
				aria-modal='true'
				role='dialog'
				aria-label='credit card payment modal'
				ref={innerRef}
				tabIndex={-1}
			>
				<div
					className={styles["modal-body"]}
					tabIndex={-1}
					ref={focusRef}
				>
					<div
						className={styles["modal-heading"]}
						role='main'
						aria-labelledby='Heading'
					>
						<h1>Payment Details</h1>
					</div>
					{children}
				</div>
			</aside>
		)
	}

	return createPortal(Wrapper(), currentContainer)
}

export { Modal }
