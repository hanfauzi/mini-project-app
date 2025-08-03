import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export interface ForgotPasswordPayload {
  newPassword: string;
}

export default function useForgotPassword() {
  const params = useParams();
  const token = params.token;

  const forgotPasswordMutation = useMutation({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      await axiosInstance.patch<ForgotPasswordPayload>(
        `/api/auth/forgot-password/${token}`,
        payload
      );
    },
    onSuccess: () => {
      toast.success("Reset password successfully!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return { forgotPasswordMutation };
}
