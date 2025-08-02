import { axiosInstance } from "@/lib/axios";
import { useAuthStore, UserStore } from "@/stores/auth";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface Payload {
  usernameOrEmail: string;
  password: string;
}

const useLoginHook = () => {
  const router = useRouter();
  const { onAuthSuccess } = useAuthStore();

  const loginOrganizerMutation = useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosInstance.post<{
        payload: UserStore;
        token: string;
      }>("/api/auth/login/organizer", payload);

      return {
        ...data.payload,
        token: data.token,
      };
    },
    onSuccess: (data: UserStore) => {
      onAuthSuccess({ user: data });
      toast.success("sign in success");
      router.replace("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return {
    loginOrganizerMutation,
  };
};

export default useLoginHook;
