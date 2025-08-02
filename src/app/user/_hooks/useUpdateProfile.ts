import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  username?: string;
  imageUrl?: File | null;
}

export default function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();


  const updateProfileMutation = useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
       console.log(user?.token);
      const formData = new FormData();
      if (payload.firstName) formData.append("firstName", payload.firstName);
      if (payload.lastName) formData.append("lastName", payload.lastName);
      if (payload.phoneNumber)
        formData.append("phoneNumber", payload.phoneNumber);
      if (payload.username) formData.append("username", payload.username);
      if (payload.imageUrl) formData.append("image", payload.imageUrl);

      await axiosInstance.patch<UpdateProfilePayload>("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Update profile successfull!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return { updateProfileMutation };
}
