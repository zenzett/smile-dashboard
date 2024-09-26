import {ApiResponse} from "./ApiResponse";
import {ManualOngoingApproval} from "./ManualOngoingApproval";
import {PaginationResponse} from "./PaginationResponse";

export type ManualOngoingApprovalCollectionResponse = ApiResponse<
	PaginationResponse<Array<ManualOngoingApproval>>
>;
