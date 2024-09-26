import {AxiosError, AxiosResponse} from "axios";
import useSWR, {SWRConfiguration} from "swr";

import axiosInstance from "@/config/client/axios";
import {ApiResponse} from "@/types/ApiResponse";
import {RejectReasonCollectionResponse} from "@/types/RejectReasonCollectionResponse";

export interface RejectReasonErrorResponse extends ApiResponse {}

export interface RejectReasonHookProps {
	config?: SWRConfiguration<
		AxiosResponse<RejectReasonCollectionResponse>,
		AxiosError<RejectReasonErrorResponse>
	>;
}

const fetcher = async (arg: {url: string}) => {
	return await axiosInstance.get<RejectReasonCollectionResponse>(arg.url);
};

export const useRejectReason = (props: RejectReasonHookProps) => {
	const {config} = props;
	return useSWR({url: "/api/manual-approval/reject-reason"}, fetcher, config);
};
