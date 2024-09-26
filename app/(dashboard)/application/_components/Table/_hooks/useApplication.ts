import {AxiosError, AxiosResponse} from "axios";
import useSWR, {SWRConfiguration} from "swr";

import axiosInstance from "@/config/client/axios";
import {ApiResponse} from "@/types/ApiResponse";
import {SimpedesUmiApplicationCollectionParams} from "@/types/SimpedesUmiApplicationCollectionParams";
import {SimpedesUmiApplicationCollectionResponse} from "@/types/SimpedesUmiApplicationCollectionResponse";

export interface ApplicationErrorResponse extends ApiResponse {}

export interface ApplicationHookProps {
	params?: SimpedesUmiApplicationCollectionParams;
	config?: SWRConfiguration<
		AxiosResponse<SimpedesUmiApplicationCollectionResponse>,
		AxiosError<ApplicationErrorResponse>
	>;
}

const fetcher = async (arg: {
	url: string;
	params: SimpedesUmiApplicationCollectionParams;
}) => {
	return await axiosInstance.get<SimpedesUmiApplicationCollectionResponse>(
		arg.url,
		{
			params: arg.params,
		},
	);
};

export const useApplication = (props: ApplicationHookProps) => {
	const {params, config} = props;
	return useSWR({url: "/api/application", params}, fetcher, config);
};
