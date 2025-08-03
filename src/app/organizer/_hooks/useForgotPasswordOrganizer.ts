import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export interface ForgotPasswordOrganizer {
  newPassword: string;
}

export default function useForgotPasswordOrganizer() {
  const params = useParams();
  const token = params.token;

  const forgotPasswordOrganizerMutation = useMutation({
    mutationFn: async (payload: ForgotPasswordOrganizer) => {
      await axiosInstance.patch<ForgotPasswordOrganizer>(
        `/api/auth/organizer/forgot-password/${token}`,
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

  return { forgotPasswordOrganizerMutation };
}
