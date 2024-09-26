import axios, {AxiosError} from "axios";

const axiosInstance = axios.create({
	baseURL: "/",
	headers: {
		"Content-Type": "application/json",
		Connection: "keep-alive",
	},
});

axiosInstance.interceptors.request.use(
	function (config) {
		if (process.env.NODE_ENV === "development") {
			console.log(config);
		}
		return config;
	},
	function (error) {
		if (process.env.NODE_ENV === "development") {
			console.log(error);
		}
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	function (response) {
		if (process.env.NODE_ENV === "development") {
			console.log(response);
		}
		return response;
	},
	function (error: AxiosError) {
		if (error.response?.config.url?.match("/login")) {
			return Promise.reject(error);
		}

		if (error.response?.status === 401) {
			const cookies = document.cookie.split(";");
			cookies.forEach((cookie) => {
				document.cookie = cookie + "=;expires=" + new Date(0).toUTCString();
			});

			window.location.href = "/login";
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
