import {FunctionComponent} from "react";

import {UserTypeID} from "@/types/UserTypeID";

import {getProfile} from "../../_utils/profile";
import OngoingManualApprovalTable from "./_components/Table";

const OngoingManualApproval: FunctionComponent = async () => {
	let profile = await getProfile();

	const userTypeId: UserTypeID = profile?.userTypeId || "VIEWER";

	return <OngoingManualApprovalTable userTypeId={userTypeId} />;
};

export default OngoingManualApproval;
