import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";

interface OverviewResponse {
  [index: number]: number; // array of 12 numbers
}

const useGetOverview = (year: number) => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["overview", year],
    queryFn: async () => {
      const { data } = await axiosInstance.get<OverviewResponse>(
        `/api/organizer/dashboard/overview?year=${year}`,
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

export default useGetOverview;
