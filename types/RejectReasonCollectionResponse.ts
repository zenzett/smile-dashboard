import {ApiResponse} from "./ApiResponse";
import {PaginationResponse} from "./PaginationResponse";
import {RejectReason} from "./RejectReason";

export type RejectReasonCollectionResponse = ApiResponse<
	PaginationResponse<RejectReason[]>
>;
