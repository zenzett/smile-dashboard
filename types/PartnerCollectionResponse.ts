import {ApiResponse} from "./ApiResponse";
import {PaginationResponse} from "./PaginationResponse";
import {Partner} from "./Partner";

export type PartnerCollectionResponse = ApiResponse<
	PaginationResponse<Partner[]>
>;
