import React, { useState, useRef } from "react"
import "./app.scss"
import { Modal } from "./components/modal/modal"
import { Form } from "./components/form/form"

function App() {
	const [shouldShowModal, setShouldShowModal] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null)
	// const mainRef = useRef<HTMLDivElement>(null)

	const toggleModal = () => {
		setShouldShowModal(!shouldShowModal)
	}

	return (
		<div tabIndex={0}>
			<div className='main'>
				<h1>Accessible Modal Demo</h1>
				<div role='button' tabIndex={-1}>
					<button
						onClick={() => setShouldShowModal(!shouldShowModal)}
					>
						Open Modal
					</button>
				</div>
			</div>

			<Modal
				open={shouldShowModal}
				onClose={() => setShouldShowModal(false)}
				toggleModal={() => setShouldShowModal(false)}
				innerRef={modalRef}
			>
				<Form onClose={toggleModal} />
			</Modal>
		</div>
	)
}

export default App
