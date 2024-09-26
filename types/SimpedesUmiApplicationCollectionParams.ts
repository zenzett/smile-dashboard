export type SimpedesUmiApplicationCollectionParams = {
	orderBy?: string;
	draw?: number;
	page: number;
	limit: number;
	search?: string;
	sortBy?: "asc" | "desc";
	disableCalculateTotal?: boolean;
	startDate?: string;
	endDate?: string;
	nama?: string;
	nik?: string;
	noTelp?: string;
	partnerId?: string;
	status?: string;
	partnerName?: string;
};
