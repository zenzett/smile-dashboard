import {FunctionComponent} from "react";

import {UserTypeID} from "@/types/UserTypeID";

import {getProfile} from "../_utils/profile";
import ApplicationTable from "./_components/Table";

const Application: FunctionComponent = async () => {
	let profile = await getProfile();

	const userTypeId: UserTypeID = profile?.userTypeId || "VIEWER";

	return <ApplicationTable userTypeId={userTypeId} />;
};

export default Application;
