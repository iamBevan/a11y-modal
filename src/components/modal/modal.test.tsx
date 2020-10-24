import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { Modal } from "./modal";

const TestComponent = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	const aRef = React.createRef<HTMLDivElement>();

	const modalButton = (
		<button
			data-testid='modal-button'
			onClick={() => {
				setIsOpen(true);
			}}
		>
			Open Modal
		</button>
	);

	const modal = (
		<Modal
			ariaLabel='Label'
			isModalOpen={isOpen}
			onClose={() => setIsOpen(false)}
			innerRef={aRef}
			children={
				// <Form
				// 	onClose={() => {
				// 		setIsOpen(false);
				// 	}}
				// />
				<div>Dog</div>
			}
		/>
	);
	return (
		<>
			{modalButton}
			{modal}
		</>
	);
};

describe("when the modal button is pressed", () => {
	it("opens the modal", async () => {
		const component = render(<TestComponent />);
		// const theButton =

		fireEvent.click(await component.findByTestId("modal-button"));

		const theModal = await component.findByTestId("modal");

		expect(theModal).toBeInTheDocument();
	});

	it("shows the close modal button", async () => {
		const component = render(<TestComponent />);
	});
});
