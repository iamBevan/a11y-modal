import React, { ReactNode, useEffect, useRef, RefObject } from "react"
import { createPortal } from "react-dom"
import styles from "./modal.module.scss"

interface ModalProps {
	toggleModal: () => void
	children: ReactNode
	onClose: () => void
	isModalOpen: boolean
	innerRef: RefObject<HTMLDivElement>
	ariaLabel: string
}
const elements =
	'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
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

			const modalElements: Element[] = Array.from(
				container.current.querySelectorAll(elements)
			).filter(el => !el.hasAttribute("disabled"))

			const firstEl = modalElements[0] as HTMLElement
			const lastEl = modalElements[
				modalElements.length - 1
			] as HTMLElement

			const lastElKeyDown = (e: KeyboardEvent) => {
				if (!e.shiftKey && e.key === "Tab") {
					e.preventDefault()
					firstEl.focus()
				}
			}
			const firstElKeyDown = (e: KeyboardEvent) => {
				if (e.shiftKey && e.key === "Tab") {
					e.preventDefault()
					lastEl.focus()
				}
			}

			firstEl.focus()
			firstEl.onfocus = function () {
				currentContainer.addEventListener("keydown", firstElKeyDown)
			}
			firstEl.onblur = function () {
				currentContainer.removeEventListener("keydown", firstElKeyDown)
			}
			lastEl.onfocus = function () {
				currentContainer.addEventListener("keydown", lastElKeyDown)
			}
			lastEl.onblur = function () {
				currentContainer.removeEventListener("keydown", lastElKeyDown)
			}
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
					<>
						<div
							className={styles["modal"]}
							aria-modal='true'
							role='dialog'
							aria-label={ariaLabel}
							ref={innerRef}
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
		)
	}

	return createPortal(Wrapper(), currentContainer)
}

export { Modal }
