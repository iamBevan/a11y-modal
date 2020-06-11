import React from "react"
import "./form.module.scss"
import styles from "./form.module.scss"
import { Input } from "../input/input"
import { Label } from "../label/label"
import { useForm } from "react-hook-form"
// import { AccessibleDatePicker } from "./accessibleDatePicker"

interface FormData {
	forename: string
	surname: string
	company: string
	email: string
	telephone: number
	cardNumber: number
	expiryDate: Date
	nameOnCard: string
	CVV: number
}

interface FormProps {
	onClose: () => void
}

const Form: React.FC<FormProps> = (props) => {
	const { register, handleSubmit, errors } = useForm<FormData>()
	const onSubmit = handleSubmit(
		({
			forename,
			surname,
			company,
			email,
			telephone,
			cardNumber,
			expiryDate,
			nameOnCard,
			CVV,
		}) => {
			console.log(
				forename,
				surname,
				company,
				email,
				telephone,
				cardNumber,
				expiryDate,
				nameOnCard,
				CVV
			)
		}
	)

	return (
		<form onSubmit={onSubmit}>
			<fieldset>
				<legend>Text fields</legend>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						margin: "20px 0",
					}}
				>
					<div style={{ width: "48%" }}>
						<Label
							for={"forename"}
							title={"required"}
							ariaLabel={"required"}
							labelName={"Forename"}
							errorText={errors.forename && "Required"}
						/>
						<Input
							name={"forename"}
							innerRef={register({
								required: "Required",
							})}
						/>
					</div>
					<div
						style={{
							width: "48%",
						}}
					>
						<Label
							for={"surname"}
							title={"required"}
							ariaLabel={"required"}
							labelName={"Surname"}
							errorText={errors.surname && "Required"}
						/>
						<Input
							name={"surname"}
							innerRef={register({
								required: "Required",
							})}
						/>
					</div>
				</div>
				<div>
					<Label
						for={"company"}
						title={"required"}
						ariaLabel={"required"}
						labelName={"Company"}
						errorText={
							errors.company
								? errors.company?.type === "required"
									? "Required"
									: "Max length exceeded"
								: undefined
						}
						validationWarning='Maximum 100 characters'
					/>
					<Input
						type={"text"}
						name={"company"}
						innerRef={register({
							required: "Required",
							maxLength: 100,
						})}
					/>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						margin: "20px 0",
					}}
				>
					<div style={{ width: "48%" }}>
						<Label
							for={"email"}
							title={"required"}
							ariaLabel={"required"}
							labelName={"Email address"}
							errorText={errors.email && "Required"}
						/>
						<Input
							name={"email"}
							innerRef={register({
								required: "Required",
							})}
						/>
					</div>
					<div style={{ width: "48%" }}>
						<Label
							for={"telephone"}
							title={"required"}
							ariaLabel={"required"}
							labelName={"Telephone number"}
							errorText={errors.telephone && "Required"}
						/>
						<Input
							name={"telephone"}
							innerRef={register({
								required: "Required",
							})}
						/>
					</div>
				</div>
				<hr />
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						margin: "20px 0",
					}}
				>
					<div style={{ width: "48%" }}>
						<Label
							for={"cardNumber"}
							title={"required"}
							ariaLabel={"required"}
							labelName={"Credit card number"}
							errorText={errors.cardNumber && "Required"}
						/>
						<Input
							name={"cardNumber"}
							innerRef={register({
								required: "Required",
							})}
						/>
					</div>
					<div style={{ width: "48%" }}>
						<Label
							for={"expiryDate"}
							title={"required"}
							ariaLabel={"required"}
							labelName={"Expiry date"}
							errorText={errors.expiryDate && "Required"}
						/>
						<Input
							name={"expiryDate"}
							innerRef={register({
								required: "Required",
							})}
						/>
						{/* <AccessibleDatePicker /> */}
					</div>
				</div>
				<div
					style={{
						display: "flex",
						margin: "20px 0",
					}}
				>
					<div style={{ width: "48%" }}>
						<Label
							for={"nameOnCard"}
							title={"required"}
							ariaLabel={"required"}
							labelName={"Name on card"}
							errorText={errors.nameOnCard && "Required"}
						/>
						<Input
							name={"nameOnCard"}
							innerRef={register({
								required: "Required",
							})}
						/>
					</div>
					<div style={{ width: "20%", marginLeft: "22px" }}>
						<Label
							for={"CVV"}
							title={"required"}
							ariaLabel={"required"}
							labelName={"CVV/CVC"}
							errorText={errors.CVV && "Required"}
						/>
						<Input
							name={"CVV"}
							innerRef={register({
								required: "Required",
							})}
						/>
					</div>
				</div>
			</fieldset>
			<div
				className={styles["footer"]}
				role='main'
				aria-labelledby='Footer'
			>
				<button type='submit'>Submit</button>
				<button
					className={styles["cancel"]}
					onClick={(e) => {
						e.preventDefault()
						props.onClose()
					}}
				>
					Cancel
				</button>
			</div>
		</form>
	)
}

export { Form }
