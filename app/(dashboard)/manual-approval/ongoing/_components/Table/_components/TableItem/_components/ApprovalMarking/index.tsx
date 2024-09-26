import "./style.css";

import React, {FunctionComponent, HTMLAttributes} from "react";

import ClockIcon from "./_components/ClockIcon";

interface ApprovalMarkingProps extends HTMLAttributes<HTMLDivElement> {
	label: string | null;
}

const ApprovalMarking: FunctionComponent<ApprovalMarkingProps> = ({label}) => {
	return (
		<div className="approval-marking">
			<ClockIcon />
			<span className="h-[18px] w-[33px] whitespace-nowrap">{label}</span>
		</div>
	);
};

export default ApprovalMarking;
