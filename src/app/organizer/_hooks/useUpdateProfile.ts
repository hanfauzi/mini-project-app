import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface UpdateProfileOrganizer {
  orgName?: string;
  email?: string;
  phoneNumber?: string;
  username?: string;
  address?: string;
  bio?: string;
  logoUrl?: File | null;
}

export default function useUpdateProfileOrganizer() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const updateProfileOrganizerMutation = useMutation({
    mutationFn: async (payload: UpdateProfileOrganizer) => {
      console.log(user?.token);
      const formData = new FormData();
      if (payload.orgName) formData.append("orgName", payload.orgName);
      if (payload.email) formData.append("email", payload.email);
      if (payload.phoneNumber)
        formData.append("phoneNumber", payload.phoneNumber);
      if (payload.username) formData.append("username", payload.username);
      if (payload.bio) formData.append("bio", payload.bio);
      if (payload.address) formData.append("address", payload.address);
      if (payload.logoUrl) formData.append("image", payload.logoUrl);

      await axiosInstance.patch<UpdateProfileOrganizer>(
        "/api/organizer/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-organizer"] });
      toast.success("Update profile successfull!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return { updateProfileOrganizerMutation };
}
