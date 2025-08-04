import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface SendEmailOrganizerPayload {
  email: string;
}


export default function useSendEmailOrganizer() {


  const sendEmailOrganizerMutation = useMutation({
    mutationFn: async (payload: SendEmailOrganizerPayload) => {
      await axiosInstance.patch<SendEmailOrganizerPayload>("/api/auth/organizer/forgot-password", payload
      );
    },
    onSuccess: () => {
      toast.success("The link has sent to your email!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return { sendEmailOrganizerMutation };
}
