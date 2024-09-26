import {AxiosResponse, isAxiosError} from "axios";
import {NextRequest, NextResponse} from "next/server";

import axiosInstance from "@/config/server/axios";
import {PartnerCollectionResponse} from "@/types/PartnerCollectionResponse";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
	let url = "/api/v1/users-dashboard/partner";

	try {
		const apiResponse: AxiosResponse<PartnerCollectionResponse> =
			await axiosInstance.get(url);

		const res = NextResponse.json(apiResponse.data, {
			status: apiResponse.status,
		});

		return res;
	} catch (error) {
		if (isAxiosError(error)) {
			return NextResponse.json(error.response?.data, {
				status: error.response?.status,
			});
		}
	}
}
