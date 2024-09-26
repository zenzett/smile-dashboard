import {AxiosResponse, isAxiosError} from "axios";
import {NextRequest, NextResponse} from "next/server";

import axiosInstance from "@/config/server/axios";
import {ApprovalActionPayload} from "@/types/ApprovalActionPayload";

export async function POST(req: NextRequest) {
	try {
		const requestData: ApprovalActionPayload = await req.json();

		const apiResponse: AxiosResponse<any> = await axiosInstance.post(
			"/api/v1/manual-approval/action",
			requestData,
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
