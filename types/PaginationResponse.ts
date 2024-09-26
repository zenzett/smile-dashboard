export type PaginationResponse<T = any[]> = {
	data: T;
	draw: number;
	hasMore: boolean;
	recordsFiltered: number;
	recordsTotal: number;
};
