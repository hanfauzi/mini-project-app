import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface SendEmailPayload {
  email: string;
}


export default function useSendEmail() {


  const sendEmailMutation = useMutation({
    mutationFn: async (payload: SendEmailPayload) => {
      await axiosInstance.patch<SendEmailPayload>("/api/auth/forgot-password", payload
      );
    },
    onSuccess: () => {
      toast.success("The link has sent to your email!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return { sendEmailMutation };
}
