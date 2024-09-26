import {loginSuccess} from "./auth";
import {downloadTableSuccess} from "./download";
import {createUserSuccess, deleteUserSuccess, updateUserSuccess} from "./user";

export const handlers = [
	downloadTableSuccess,
	createUserSuccess,
	updateUserSuccess,
	deleteUserSuccess,
	loginSuccess,
];
