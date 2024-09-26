import {RejectReasonStatus} from "./RejectReasonStatus";

export type ManualHistoryApprovalDetail = {
	id: string;
	name: string;
	idNo: string;
	phoneNumber: string;
	livenessScore: string;
	gender: string;
	religion: string;
	createdAt: string;
	updatedAt: string;
	job: string;
	address: string;
	domicileaddress: string;
	education: string;
	maritalStatus: string;
	birthPlace: string;
	dob: string;
	productId: string;
	faceCompareStatus: string;
	approvedBy: string;
	status: RejectReasonStatus;
	reason: string;
	ktpPath: string;
	selfiePath: string;
};
