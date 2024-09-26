import {FunctionComponent} from "react";

import {UserTypeID} from "@/types/UserTypeID";

import {getProfile} from "../_utils/profile";
import UserTable from "./_components/Table";

const Admin: FunctionComponent = async () => {
	const profile = await getProfile();

	const userTypeId: UserTypeID = profile?.userTypeId || "VIEWER";

	return <UserTable userTypeId={userTypeId} />;
};

export default Admin;
