import React from "react"

const ToggleContent: React.FC = ({ toggle, content }: any) => {
	const [isShown, setIsShown] = React.useState(false)
	const hide = () => setIsShown(false)
	const show = () => setIsShown(true)

	return (
		<React.Fragment>
			{toggle(show)}
			{isShown && content(hide)}
		</React.Fragment>
	)
}

export { ToggleContent }
