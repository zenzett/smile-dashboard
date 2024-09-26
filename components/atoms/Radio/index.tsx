import React, {ButtonHTMLAttributes, useMemo} from "react";

type Props = ButtonHTMLAttributes<HTMLInputElement> & {
	radioContainerStyle?: React.CSSProperties;
	radioOuterCircleClassName?: string;
	radioInnerCircleClassName?: string;
	size?: "sm" | "md" | "lg";
	className?: string;
	disabled?: boolean;
	checked?: boolean;
	label?: string;
};

const Radio = React.forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
	const {
		radioOuterCircleClassName,
		radioInnerCircleClassName,
		radioContainerStyle,
		size = "md",
		className,
		disabled,
		checked,
		label,
		style,
		...attrs
	} = props;

	const outerCircleColor = useMemo(() => {
		if (checked && disabled) {
			return "#E5E5E5";
		} else if (!checked && disabled) {
			return "#FCFCFC";
		} else if (checked && !disabled) {
			return "#C4D4E3";
		} else {
			return "#FCFCFC";
		}
	}, [checked, disabled]);

	const outerCircleBorderColor = useMemo(() => {
		if (disabled) {
			return "#E5E5E580";
		} else {
			return "#A3A3A3";
		}
	}, [disabled]);

	const innerCircleColor = useMemo(() => {
		if (!checked) return "transparent";
		if (disabled) {
			return "#808080";
		} else {
			return "#0051A0";
		}
	}, [checked, disabled]);

	return (
		<label
			className={`radio-label`
				.concat(className ? " " + className : "")
				.concat(size ? " " + size : "")}
			style={style}
			data-testid="radio-label"
		>
			{label}
			<input
				disabled={disabled}
				type="radio"
				className={`radio`}
				{...attrs}
				ref={ref}
			/>
			<span
				className={`radio-outer-circle`
					.concat(!checked ? " border" : "")
					.concat(
						radioOuterCircleClassName ? " " + radioOuterCircleClassName : "",
					)
					.concat(size ? " " + size : "")}
				style={{
					backgroundColor: outerCircleColor,
					borderColor: outerCircleBorderColor,
					...radioContainerStyle,
				}}
			></span>
			<span
				className={`radio-inner-circle`
					.concat(
						radioInnerCircleClassName ? " " + radioInnerCircleClassName : "",
					)
					.concat(size ? " " + size : " ")}
				style={{backgroundColor: innerCircleColor}}
			></span>
		</label>
	);
});

Radio.displayName = "Radio";

export default Radio;
