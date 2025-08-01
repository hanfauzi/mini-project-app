import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

// Interceptor untuk inject token ke setiap request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined") {
//       const accessToken = localStorage.getItem("accessToken");
//       console.log(accessToken)
//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;

//       }
      
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
