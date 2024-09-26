import {FunctionComponent, HTMLAttributes} from "react";

interface PageTitleProps extends HTMLAttributes<HTMLHeadElement> {}

const PageTitle: FunctionComponent<PageTitleProps> = ({
	className,
	...attrs
}) => {
	return (
		<h1
			className={"page-title".concat(className ? ` ${className}` : "")}
			{...attrs}
		/>
	);
};

export default PageTitle;
