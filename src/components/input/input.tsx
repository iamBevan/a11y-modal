import React from "react"
import { useForm } from "react-hook-form"

interface InputProps {
	type?: string
	name: string
	width?: string
	innerRef: React.Ref<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({ type, name, width, innerRef }) => {
	const { errors } = useForm()
	const handleError = errors.name

	return (
		<input
			style={{ width: width && `${width}%` }}
			id={name}
			type={type ?? "text"}
			name={name}
			aria-invalid={handleError ? "true" : "false"}
			aria-describedby={`${name} + Error`}
			ref={innerRef}
			autoComplete='off'
		/>
	)
}

export { Input }
