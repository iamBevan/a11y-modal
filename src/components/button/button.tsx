import React from "react"
import styles from "./button.module.scss"

interface ButtonProps {
	className?: string
	onClick: () => void
	type: "button" | "submit" | "reset" | undefined
	text: string
}

const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button
			type={props.type ?? "button"}
			className={props.type !== "submit" ? styles["cancel"] : ""}
			onClick={(e) => {
				e.preventDefault()
				props.onClick()
			}}
		>
			{props.text}
		</button>
	)
}

export { Button }
