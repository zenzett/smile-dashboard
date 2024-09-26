import {FunctionComponent, HTMLAttributes} from "react";

interface SidebarItemProps extends HTMLAttributes<HTMLDivElement> {
	isActive?: boolean;
}

const SidebarMenu: FunctionComponent<SidebarItemProps> = ({
	className,
	isActive,
	...attrs
}) => {
	return (
		<div
			className={"menu"
				.concat(isActive ? " active" : "")
				.concat(className ? ` ${className}` : "")}
			{...attrs}
		/>
	);
};

export default SidebarMenu;
