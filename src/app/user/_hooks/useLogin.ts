import { axiosInstance } from "@/lib/axios";
import { useAuthStore, UserStore } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  usernameOrEmail: string;
  password: string;
}

const useLoginHook = () => {
  const router = useRouter();
  const { onAuthSuccess } = useAuthStore();

  const loginUserMutation = useMutation({
  mutationFn: async (payload: Payload) => {
    const { data } = await axiosInstance.post<{ payload: UserStore; token: string }>(
      "/api/auth/login",
      payload
    );

    return {
      ...data.payload,
      token: data.token,
    };
  },
  onSuccess: (data: UserStore) => {
    onAuthSuccess({ user: data });
    toast.success("Sign in success");
    router.replace("/");
  },
  onError: (error: AxiosError<{ message: string }>) => {
    toast.error(error.response?.data.message ?? "Something went wrong!");
  },
});

  return {
    loginUserMutation,
  };
};

export default useLoginHook;
