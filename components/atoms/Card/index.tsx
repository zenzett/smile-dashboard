import {FunctionComponent, HTMLAttributes} from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card: FunctionComponent<CardProps> = ({className, ...attrs}) => {
	return (
		<div
			className={"card".concat(className ? ` ${className}` : "")}
			{...attrs}
		/>
	);
};

export default Card;
