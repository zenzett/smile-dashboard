import React, {FunctionComponent} from "react";

import Navbar from "@/components/molecules/Navbar";

type TemplateProps = {
	children: React.ReactNode;
};

const Template: FunctionComponent<TemplateProps> = ({children}) => {
	return (
		<React.Fragment>
			<Navbar />
			<div className="wrapper">{children}</div>
		</React.Fragment>
	);
};

export default Template;
