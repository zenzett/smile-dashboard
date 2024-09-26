import {AxiosError, AxiosResponse} from "axios";
import useSWR, {SWRConfiguration} from "swr";

import axiosInstance from "@/config/client/axios";
import {ApiResponse} from "@/types/ApiResponse";
import {ApplicationStatusCollectionResponse} from "@/types/ApplicationStatusCollectionResponse";

export interface ApplicationErrorResponse extends ApiResponse {}

export interface ApplicationHookProps {
	config?: SWRConfiguration<
		AxiosResponse<ApplicationStatusCollectionResponse>,
		AxiosError<ApplicationErrorResponse>
	>;
}

const fetcher = async (arg: {url: string}) => {
	return await axiosInstance.get<ApplicationStatusCollectionResponse>(arg.url);
};

export const useStatus = (props: ApplicationHookProps) => {
	const {config} = props;
	return useSWR({url: "/api/application-status"}, fetcher, config);
};
