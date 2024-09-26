import {ProductID} from "./ProductID";

export type ManualOngoingApproval = {
	id: string;
	name: string;
	idNo: string;
	partnerName: string;
	livenessScore: string;
	createdAt: string;
	updatedAt: string;
	countdownAutoReject: string | null;
	faceCompareStatus: string;
};
