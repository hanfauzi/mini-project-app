import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://tickly-backend.vercel.app/api",
});


