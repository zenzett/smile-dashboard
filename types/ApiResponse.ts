export type ApiResponse<T = any> = {
	responseCode: string;
	responseDescription: string;
	data: T;
};
