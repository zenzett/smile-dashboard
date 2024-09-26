import {HTMLAttributes} from "react";

type Props = HTMLAttributes<HTMLDivElement>;

const Body = (props: Props) => {
	const {className, ...attrs} = props;

	return (
		<div
			className={"modal-body".concat(className ? " " + className : "")}
			{...attrs}
		/>
	);
};

export default Body;
