"use server";

import axiosInstance from "@/config/server/axios";
import {ProfileResponse} from "@/types/ProfileResponse";

export const getProfile = async () => {
	try {
		const apiResponse = await axiosInstance.get<ProfileResponse>(
			"/api/v1/users-dashboard/get/profile",
		);

		const profile = apiResponse.data.data;
		return profile;
	} catch (error) {
		return null;
	}
};
