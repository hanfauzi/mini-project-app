import { axiosInstance } from "@/lib/axios";
import { UserStore } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RegisterOrganizerPayload {
  username: string;
  email: string;
  password: string;
}

const useRegisterHook = () => {
  const router = useRouter();

  const registerOrganizerMutation = useMutation({
    mutationFn: async (payload: RegisterOrganizerPayload) => {
      const { data } = await axiosInstance.post<UserStore>(
        "/api/auth/register/organizer",
        payload
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Register Organizer success! Login link will sent to your email!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return {
    registerOrganizerMutation,
  };
};

export default useRegisterHook;
