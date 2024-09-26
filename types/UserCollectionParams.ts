export type UserCollectionParams = {
	orderBy?: string;
	draw?: number;
	page: number;
	limit: number;
	userId?: string;
	search?: string;
	sortBy?: "asc" | "desc";
	userTypeId?: string;
};
