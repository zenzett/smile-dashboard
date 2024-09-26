import {ApiResponse} from "./ApiResponse";
import {PaginationResponse} from "./PaginationResponse";
import {User} from "./User";

export type UserCollectionResponse = ApiResponse<PaginationResponse<User[]>>;
