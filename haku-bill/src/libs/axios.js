import axios from "axios";
// import { getToken } from "@/utils/auth";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_ENDPOINT,
	timeout: 60000,
});

// エラーハンドル
api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		throw error;
	}
);

export default api;
