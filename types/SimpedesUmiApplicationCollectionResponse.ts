import {ApiResponse} from "./ApiResponse";
import {PaginationResponse} from "./PaginationResponse";
import {SimpedesUmiApplication} from "./SimpedesUmiApplication";

export type SimpedesUmiApplicationCollectionResponse = ApiResponse<
	PaginationResponse<Array<SimpedesUmiApplication>>
>;
