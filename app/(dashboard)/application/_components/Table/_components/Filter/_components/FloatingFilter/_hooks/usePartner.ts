import {AxiosError, AxiosResponse} from "axios";
import useSWR, {SWRConfiguration} from "swr";

import axiosInstance from "@/config/client/axios";
import {ApiResponse} from "@/types/ApiResponse";
import {PartnerCollectionResponse} from "@/types/PartnerCollectionResponse";

export interface ApplicationErrorResponse extends ApiResponse {}

export interface ApplicationHookProps {
	config?: SWRConfiguration<
		AxiosResponse<PartnerCollectionResponse>,
		AxiosError<ApplicationErrorResponse>
	>;
}

const fetcher = async (arg: {url: string}) => {
	return await axiosInstance.get<PartnerCollectionResponse>(arg.url);
};

export const usePartner = (props: ApplicationHookProps) => {
	const {config} = props;
	return useSWR({url: "/api/partner"}, fetcher, config);
};
