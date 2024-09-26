import {FunctionComponent, HTMLAttributes} from "react";

interface FilterUserProps extends HTMLAttributes<HTMLDivElement> {
	isActive?: boolean;
}

const FilterUser: FunctionComponent<FilterUserProps> = ({
	className,
	isActive,
	...attrs
}) => {
	return (
		<div
			className={"filter-user"
				.concat(isActive ? " active" : "")
				.concat(className ? ` ${className}` : "")}
			{...attrs}
		/>
	);
};

export default FilterUser;
