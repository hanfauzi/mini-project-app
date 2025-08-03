import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { DashboardSummary } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

const useGetDashboard = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["dashboard-organizer"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<DashboardSummary>(
        "/api/organizer/dashboard",
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

export default useGetDashboard;
