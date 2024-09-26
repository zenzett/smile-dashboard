import {AxiosResponse, isAxiosError} from "axios";
import {NextRequest, NextResponse} from "next/server";

import axiosInstance from "@/config/server/axios";
import {ProfileResponse} from "@/types/ProfileResponse";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
	let url = "/api/v1/users-dashboard/get/profile";

	try {
		const apiResponse: AxiosResponse<ProfileResponse> =
			await axiosInstance.get(url);

		const res = NextResponse.json(apiResponse.data, {
			status: apiResponse.status,
		});

		res.cookies.set({
			name: "NAME",
			value: apiResponse.data.data.name,
			path: "/",
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
