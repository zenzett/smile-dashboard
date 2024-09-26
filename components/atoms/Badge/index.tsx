import React, {LabelHTMLAttributes} from "react";

type Props = LabelHTMLAttributes<HTMLDivElement> & {
	status?: "success" | "pending" | "error";
	size?: "xxs" | "xs" | "sm" | "md";
	text?: string;
};

const Badge = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
	const {status = "pending", size = "md", className, text, ...attrs} = props;
	return (
		<div
			className={"badge"
				.concat(status ? ` ${status}` : "")
				.concat(size ? ` ${size}` : "")
				.concat(className ? ` ${className}` : "")}
			{...attrs}
			ref={ref}
		>
			{text}
		</div>
	);
});

Badge.displayName = "Badge";

export default Badge;
