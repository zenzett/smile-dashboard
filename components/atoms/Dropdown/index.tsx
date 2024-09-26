import React, {HTMLAttributes, ReactNode} from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
	isOpen: boolean;
	children: ReactNode;
};

const Dropdown = (props: Props) => {
	const {isOpen, children, ...attrs} = props;

	return (
		<div
			className={"absolute right-0 mt-2 w-[22.5rem] rounded-xl p-4 bg-white border shadow-level-2".concat(
				isOpen ? "" : " hidden",
			)}
			{...attrs}
		>
			{children}
		</div>
	);
};

export default Dropdown;
