import "./style.css";

import React from "react";

import InfoIcon from "./_components/InfoIcon";

const ApprovalMarkingAlert = () => {
	return (
		<div className="ongoing-approval-marking-alert">
			<InfoIcon />
			<span className="text-dark-20 text-xs font-medium">
				Segera
				<span className="font-bold"> lakukan persetujuan </span>
				terhadap pengajuan yang memiliki
				<span className="font-bold">
					{" "}
					sisa waktu persetujuan kurang dari 4 hari.
				</span>
			</span>
		</div>
	);
};

export default ApprovalMarkingAlert;
