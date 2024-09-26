import {FunctionComponent, HTMLAttributes} from "react";

type FormIconProps = HTMLAttributes<HTMLDivElement> & {
	iconPosition?: "left" | "right";
};

const FormIcon: FunctionComponent<FormIconProps> = ({
	className,
	iconPosition = "right",
	...attrs
}) => {
	return (
		<div
			className={"form-icon"
				.concat(iconPosition === "left" ? " icon-left" : " icon-right")
				.concat(className ? ` ${className}` : "")}
			{...attrs}
		/>
	);
};

export default FormIcon;
