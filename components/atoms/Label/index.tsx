import {FC, LabelHTMLAttributes} from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const Label: FC<LabelProps> = (props) => {
	const {className, ...attrs} = props;

	return (
		<label
			className={"label".concat(className ? " " + className : "")}
			{...attrs}
		/>
	);
};

export default Label;
