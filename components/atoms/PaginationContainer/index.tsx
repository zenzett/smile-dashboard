import {FunctionComponent, HTMLAttributes} from "react";

interface PaginationContainerProps extends HTMLAttributes<HTMLDivElement> {}

const PaginationContainer: FunctionComponent<PaginationContainerProps> = ({
	className,
	...attrs
}) => {
	return (
		<div
			className={"container-pagination".concat(
				className ? ` ${className}` : "",
			)}
			{...attrs}
		/>
	);
};

export default PaginationContainer;
