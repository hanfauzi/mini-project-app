import { axiosInstance } from "@/lib/axios";
import { useAuthStore, UserStore } from "@/stores/auth";

import { useQuery } from "@tanstack/react-query";

const useGetProfile = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<UserStore>("/api/profile", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      return data;
    },
  });
};

export default useGetProfile;
