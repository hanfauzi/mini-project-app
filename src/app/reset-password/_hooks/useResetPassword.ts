import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface ResetPasswordPayload {
  oldPassword: string;
  newPassword: string;
}


export default function useResetPassword(role: "USER" | "ORGANIZER") {
  const { user } = useAuthStore();
  const endpoint =
    role === "ORGANIZER"
      ? "/api/organizer/reset-password"
      : "/api/reset-password";

  const resetPasswordMutation = useMutation({
    mutationFn: async (payload: ResetPasswordPayload) => {
      await axiosInstance.patch<ResetPasswordPayload>(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Password changed successfully!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return { resetPasswordMutation };
}
