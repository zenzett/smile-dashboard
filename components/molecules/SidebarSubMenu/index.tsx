import {FunctionComponent, HTMLAttributes} from "react";

interface SidebarItemProps extends HTMLAttributes<HTMLDivElement> {
	isActive?: boolean;
}

const SidebarSubMenu: FunctionComponent<SidebarItemProps> = ({
	className,
	isActive,
	...attrs
}) => {
	return (
		<div
			className={"submenu"
				.concat(isActive ? " active" : "")
				.concat(className ? ` ${className}` : "")}
			{...attrs}
		/>
	);
};

export default SidebarSubMenu;
