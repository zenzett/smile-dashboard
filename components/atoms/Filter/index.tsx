import React, {ButtonHTMLAttributes} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonFilter = React.forwardRef<HTMLButtonElement, Props>(
	(props, ref) => {
		const {className, ...attrs} = props;

		return (
			<button
				className={"filter-button".concat(className ? ` ${className}` : "")}
				{...attrs}
				ref={ref}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
				>
					<path
						d="M9.00006 8.23993L13.554 3.67125C13.8389 3.38479 14 2.99351 14 2.58517V1.24522C14 0.404463 13.3329 0 12.5101 0H1.48988C0.667061 0 0 0.404463 0 1.24522V2.60923C0 2.99585 0.143593 3.36848 0.402671 3.65107L4.58664 8.21589C4.66566 8.30207 4.77582 8.35091 4.89206 8.35169L8.7045 8.36258C8.81471 8.36336 8.92103 8.31988 9.00006 8.23993Z"
						fill="#1078CA"
					/>
					<path
						d="M4.71057 8.31104V13.448C4.71057 13.6351 4.80478 13.8114 4.95901 13.9122C5.04714 13.9705 5.14895 14 5.25075 14C5.32749 14 5.40422 13.9836 5.47567 13.9511L8.56026 12.5133C8.75323 12.424 8.87705 12.2276 8.87705 12.011V8.31104H4.71057Z"
						fill="#BBDEFA"
					/>
				</svg>
				<span>Filter</span>
			</button>
		);
	},
);

ButtonFilter.displayName = "ButtonFilter";

export default ButtonFilter;
