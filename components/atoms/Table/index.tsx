import React, {FunctionComponent, TableHTMLAttributes} from "react";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}

const Table: FunctionComponent<TableProps> = ({className, ...attrs}) => {
	return (
		<table
			className={"table".concat(className ? ` ${className}` : "")}
			{...attrs}
		/>
	);
};

export default Table;
