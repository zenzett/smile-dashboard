import {FunctionComponent, HTMLAttributes} from "react";

type FormMessageProps = HTMLAttributes<HTMLElement> & {
	variant?: "danger";
};

const FormMessage: FunctionComponent<FormMessageProps> = ({
	className,
	variant,
	...attrs
}) => {
	return (
		<small
			className={"form-message"
				.concat(variant ? ` ${variant}` : "")
				.concat(className ? ` ${className}` : "")}
			{...attrs}
		/>
	);
};

export default FormMessage;
