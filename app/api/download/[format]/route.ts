import {AxiosResponse, isAxiosError} from "axios";
import {NextRequest, NextResponse} from "next/server";

import axiosInstance from "@/config/server/axios";
import {SimpedesUmiApplicationDownloadTableResponse} from "@/types/SimpedesUmiApplicationDownloadTableResponse";

export async function GET(
	req: NextRequest,
	{params}: {params: {format: string}},
) {
	const dateParams = req.url.split("?");

	let url = "/api/v1/simpedes-umi/table/" + params.format;

	if (dateParams.length === 2) {
		url = url + "?" + dateParams[1];
	}

	try {
		const apiResponse: AxiosResponse<SimpedesUmiApplicationDownloadTableResponse> =
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
