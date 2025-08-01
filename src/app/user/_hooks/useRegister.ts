import { axiosInstance } from "@/lib/axios";
import { UserStore } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  referralCode: string;
}

const useRegisterHook = () => {
  const router = useRouter();

  const registerUserMutation = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await axiosInstance.post<UserStore>(
        "/api/auth/register",
        payload
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Register success");
      router.replace("/user/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return {
    registerUserMutation,
  };
};

export default useRegisterHook;
