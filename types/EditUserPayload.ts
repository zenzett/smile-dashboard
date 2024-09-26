export type EditUserPayload = {
	id: string;
	deviceId: string;
	name: string;
	email: string;
	phoneNumber: string;
	username: string;
	userTypeId: string;
	password?: string | null;
	passwordConfirm?: string | null;
};
