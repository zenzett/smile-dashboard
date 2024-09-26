import {AxiosError, AxiosResponse} from "axios";
import useSWR, {SWRConfiguration} from "swr";

import axiosInstance from "@/config/client/axios";
import {ApiResponse} from "@/types/ApiResponse";
import {ManualOngoingApprovalCollectionParams} from "@/types/ManualOngoingApprovalCollectionParams";
import {ManualOngoingApprovalCollectionResponse} from "@/types/ManualOngoingApprovalCollectionResponse";

export interface ManualOngoingApprovalErrorResponse extends ApiResponse {}

export interface OngoingApprovalHookProps {
	params?: ManualOngoingApprovalCollectionParams;
	config?: SWRConfiguration<
		AxiosResponse<ManualOngoingApprovalCollectionResponse>,
		AxiosError<ManualOngoingApprovalErrorResponse>
	>;
}

const fetcher = async (arg: {
	url: string;
	params: ManualOngoingApprovalCollectionParams;
}) => {
	return await axiosInstance.get<ManualOngoingApprovalCollectionResponse>(
		arg.url,
		{
			params: arg.params,
		},
	);
};

export const useOngoingApproval = (props: OngoingApprovalHookProps) => {
	const {params, config} = props;
	return useSWR({url: "/api/manual-approval/ongoing", params}, fetcher, config);
};
