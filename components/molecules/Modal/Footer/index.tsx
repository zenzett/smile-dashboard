import {HTMLAttributes} from "react";

type Props = HTMLAttributes<HTMLDivElement>;

const Footer = (props: Props) => {
	const {className, ...attrs} = props;

	return (
		<div
			className={"modal-footer".concat(className ? " " + className : "")}
			{...attrs}
		/>
	);
};

export default Footer;
