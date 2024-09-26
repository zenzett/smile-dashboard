import {FunctionComponent} from "react";

import {UserTypeID} from "@/types/UserTypeID";

import {getProfile} from "../../_utils/profile";
import HistoryManualApprovalTable from "./_components/Table";

const HistoryManualApproval: FunctionComponent = async () => {
	let profile = await getProfile();

	const userTypeId: UserTypeID = profile?.userTypeId || "VIEWER";

	return <HistoryManualApprovalTable userTypeId={userTypeId} />;
};

export default HistoryManualApproval;
