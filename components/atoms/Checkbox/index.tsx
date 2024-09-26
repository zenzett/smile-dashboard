import React, {InputHTMLAttributes} from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	size?: "sm" | "md" | "lg";
	label?: string;
};

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
	(props: Props, ref) => {
		const {size, label, ...attrs} = props;

		return (
			<label className="checkbox-label">
				<input type="checkbox" {...attrs} ref={ref} />
				<span className="checkbox-outer">
					<span className="checkbox-checkmark"></span>
				</span>
				<span className="text">{label}</span>
			</label>
		);
	},
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
