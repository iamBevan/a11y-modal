import React, { useState, useRef } from "react"
import "./app.scss"
import { Modal } from "./components/modal/modal"
import { Form } from "./components/form/form"

function App() {
	const [shouldShowModal, setShouldShowModal] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null)

	const toggleModal = () => {
		setShouldShowModal(!shouldShowModal)
	}

	return (
		<>
			<header>
				<h1 className='heading'>Accessible Modal Demo</h1>
			</header>
			<div className='main' role='main'>
				<Modal
					open={shouldShowModal}
					onClose={() => setShouldShowModal(false)}
					toggleModal={() => setShouldShowModal(false)}
					innerRef={modalRef}
					ariaLabel={"credit card payment modal"}
				>
					<Form onClose={toggleModal} />
				</Modal>
				<div role='button' tabIndex={0}>
					<p>
						Click the button below to open a focus locked aria
						modal.
					</p>
					<button
						onClick={() => setShouldShowModal(!shouldShowModal)}
					>
						Open Modal
					</button>
				</div>
			</div>
		</>
	)
}

export default App
