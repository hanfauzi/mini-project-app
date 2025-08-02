import { axiosInstance } from "@/lib/axios";
import { useAuthStore, UserStore } from "@/stores/auth";

import { useQuery } from "@tanstack/react-query";

const useGetOrganizerProfile = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["profile-organizer"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<UserStore>(
        "/api/organizer/profile",
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return data;
    },
  });
};

export default useGetOrganizerProfile;
