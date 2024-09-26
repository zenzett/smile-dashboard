import {AxiosError, AxiosResponse} from "axios";
import useSWR, {SWRConfiguration} from "swr";

import axiosInstance from "@/config/client/axios";
import {ApiResponse} from "@/types/ApiResponse";
import {ManualHistoryApprovalCollectionParams} from "@/types/ManualHistoryApprovalCollectionParams";
import {ManualHistoryApprovalCollectionResponse} from "@/types/ManualHistoryApprovalCollectionResponse";

export interface ManualHistoryApprovalErrorResponse extends ApiResponse {}

export interface HistoryApprovalHookProps {
	params?: ManualHistoryApprovalCollectionParams;
	config?: SWRConfiguration<
		AxiosResponse<ManualHistoryApprovalCollectionResponse>,
		AxiosError<ManualHistoryApprovalErrorResponse>
	>;
}

const fetcher = async (arg: {
	url: string;
	params: ManualHistoryApprovalCollectionParams;
}) => {
	return await axiosInstance.get<ManualHistoryApprovalCollectionResponse>(
		arg.url,
		{
			params: arg.params,
		},
	);
};

export const useHistoryApproval = (props: HistoryApprovalHookProps) => {
	const {params, config} = props;
	return useSWR({url: "/api/manual-approval/history", params}, fetcher, config);
};
