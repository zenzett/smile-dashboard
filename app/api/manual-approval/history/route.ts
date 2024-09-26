import {AxiosResponse, isAxiosError} from "axios";
import {NextRequest, NextResponse} from "next/server";

import axiosInstance from "@/config/server/axios";
import {ManualHistoryApprovalCollectionResponse} from "@/types/ManualHistoryApprovalCollectionResponse";

export async function GET(req: NextRequest) {
	const searchParams = req.url.split("?");

	let url = "/api/v1/manual-approval/list-history";

	if (searchParams.length === 2) {
		url = url + "?" + searchParams[1];
	}

	try {
		const apiResponse: AxiosResponse<ManualHistoryApprovalCollectionResponse> =
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
