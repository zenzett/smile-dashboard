import React, {InputHTMLAttributes} from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	variant?: "error";
};

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
	const {className, variant, type, ...attrs} = props;
	return (
		<div className="relative">
			{type === "date" ? (
				<i className="fa-regular fa-calendar absolute top-4 left-3 text-[#777777] pointer-events-none"></i>
			) : (
				false
			)}

			<input
				className={"input"
					.concat(variant === "error" ? " error" : "")
					.concat(className ? " " + className : "")
					.concat(type === "date" ? " px-[34px]" : "")}
				{...attrs}
				type={type === "date" ? undefined : type}
				ref={ref}
			/>

			{type === "date" ? (
				<i className="fa-solid fa-chevron-down absolute top-4 right-3 text-[#777777] pointer-events-none"></i>
			) : (
				false
			)}
		</div>
	);
});

Input.displayName = "Input";

export default Input;
