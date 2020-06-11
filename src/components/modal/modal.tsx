import React, { ReactNode, useEffect, useRef, RefObject } from "react"
import { createPortal } from "react-dom"
import styles from "./modal.module.scss"
import FocusLock from "react-focus-lock"

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
			<>
				{open && (
					<FocusLock>
						<div
							className={styles["modal"]}
							aria-modal='true'
							role='dialog'
							aria-label='credit card payment modal'
							ref={innerRef}
							tabIndex={0}
						>
							<div className={styles["modal-body"]} tabIndex={-1}>
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
