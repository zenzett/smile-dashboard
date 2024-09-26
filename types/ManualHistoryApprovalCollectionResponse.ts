import {ApiResponse} from "./ApiResponse";
import {ManualHistoryApproval} from "./ManualHistoryApproval";
import {PaginationResponse} from "./PaginationResponse";

export type ManualHistoryApprovalCollectionResponse = ApiResponse<
	PaginationResponse<Array<ManualHistoryApproval>>
>;
