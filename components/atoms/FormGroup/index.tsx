import {FunctionComponent, HTMLAttributes} from "react";

type FormGroupProps = HTMLAttributes<HTMLDivElement>;

const FormGroup: FunctionComponent<FormGroupProps> = ({
	className,
	...attrs
}) => {
	return (
		<div
			className={"form-group".concat(className ? ` ${className}` : "")}
			{...attrs}
		/>
	);
};

export default FormGroup;
