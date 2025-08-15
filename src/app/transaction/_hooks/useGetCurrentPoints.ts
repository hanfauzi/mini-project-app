import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth"
import { useQuery } from "@tanstack/react-query";


const useGetCurrentPoints = () => {
    const {user} = useAuthStore();

    return useQuery<number, Error>({
    queryKey: ["currentPoints"], 
    queryFn: async () => {
      if (!user?.token) throw new Error("User tidak terautentikasi");

      const res = await axiosInstance.get("/api/current-points", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      return res.data.data.currentPoints;
    },
    enabled: !!user?.token, 
  });
}

export default useGetCurrentPoints;