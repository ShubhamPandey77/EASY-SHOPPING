    import axios from "axios";
    import { getToken } from "./auth";
    

    const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,   // .env file se url export krne ke liye import.meta.env.url-name likhte h
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

