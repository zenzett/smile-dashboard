import {FunctionComponent, HTMLAttributes} from "react";

type SidebarProps = HTMLAttributes<HTMLDivElement>;

const Sidebar: FunctionComponent<SidebarProps> = ({className, ...attrs}) => {
	return (
		<div
			className={"sidebar".concat(className ? ` ${className}` : "")}
			{...attrs}
		/>
	);
};

export default Sidebar;
