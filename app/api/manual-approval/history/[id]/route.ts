import {AxiosResponse, isAxiosError} from "axios";
import {NextRequest, NextResponse} from "next/server";

import axiosInstance from "@/config/server/axios";
import {ManualHistoryApprovalDetailResponse} from "@/types/ManualHistoryApprovalDetailResponse";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
	try {
		const apiResponse: AxiosResponse<ManualHistoryApprovalDetailResponse> =
			await axiosInstance.get(
				`/api/v1/manual-approval/detail-history/${params.id}`,
			);

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
