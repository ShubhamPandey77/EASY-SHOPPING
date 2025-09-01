    import axios from "axios";
    import { getToken } from "./auth";
    

    const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    headers: { "Content-Type": "application/json" },
    });
    

    axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    });

    export default axiosInstance;

