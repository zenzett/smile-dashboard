import React, {ButtonHTMLAttributes, ReactNode} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?:
		| "primary"
		| "secondary"
		| "danger"
		| "primary-outline"
		| "danger-outline";
	size?: "sm" | "md" | "lg";
	transparent?: boolean;
	bordered?: boolean;
	isLoading?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
	const {
		variant = "primary",
		size = "md",
		transparent,
		className,
		bordered,
		children,
		isLoading,
		...attrs
	} = props;

	return (
		<button
			className={"btn"
				.concat(variant ? ` ${variant}` : "")
				.concat(size === "sm" ? " sm" : "")
				.concat(size === "md" ? " md" : "")
				.concat(size === "lg" ? " lg" : "")
				.concat(bordered ? ` bordered` : "")
				.concat(transparent ? " transparent" : "")
				.concat(className ? ` ${className}` : "")}
			{...attrs}
			ref={ref}
		>
			{isLoading ? (
				<i className="fa-solid fa-spinner animate-spin text-light-80"></i>
			) : (
				false
			)}
			{children}
		</button>
	);
});

Button.displayName = "Button";

export default Button;
