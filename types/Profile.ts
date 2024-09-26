import {UserTypeID} from "./UserTypeID";

export type Profile = {
	userId: number;
	userTypeId: UserTypeID;
	name: string;
	feature: string;
	username: string;
};
