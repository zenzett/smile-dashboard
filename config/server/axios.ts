import axios, {AxiosError} from "axios";
import {cookies} from "next/headers";

const axiosInstance = axios.create({
	baseURL: process.env.API_BFF_URL,
	headers: {
		"Content-Type": "application/json",
		Connection: "keep-alive",
	},
});

axiosInstance.interceptors.request.use(
	function (config) {
		const token = cookies().get("TOKEN");

		if (token) {
			config.headers.Authorization = `Bearer ${token.value}`;
		}

		return config;
	},
	function (error) {
		console.log(error);
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	function (response) {
		console.log(response);
		return response;
	},
	function (error: AxiosError) {
		console.log(error);
		return Promise.reject(error);
	},
);

export default axiosInstance;
