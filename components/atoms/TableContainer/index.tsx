import {FunctionComponent, HTMLAttributes} from "react";

interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {}

const TableContainer: FunctionComponent<TableContainerProps> = ({
	className,
	...attrs
}) => {
	return (
		<div
			className={"table-container".concat(className ? ` ${className}` : "")}
			{...attrs}
		/>
	);
};

export default TableContainer;
