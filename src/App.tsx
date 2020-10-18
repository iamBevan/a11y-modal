import React, { useState, useRef } from "react";
import "./app.scss";
import { Modal } from "./components/modal/modal";
import { Form } from "./components/form/form";

function App() {
	const [shouldShowModal, setShouldShowModal] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<header>
				<h1 className='heading'>Accessible Modal Demo</h1>
			</header>
			<div className='main' role='main'>
				<Modal
					isModalOpen={shouldShowModal}
					onClose={() => setShouldShowModal(false)}
					innerRef={modalRef}
					ariaLabel={"credit card payment modal"}
				>
					<Form onClose={() => setShouldShowModal(false)} />
				</Modal>
				<div>
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
	);
}

export default App;
