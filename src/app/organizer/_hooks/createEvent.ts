import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import {
  useMutation
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface CreateEventPayload {
  title: string;
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
  category: string;
  location: string;
  description: string;
  price: string;
  maxCapacity: string;
  status: string;
  image: File | null;
}
export interface CreateEventFormValues {
  title: string;
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
  category: string;
  location: string;
  description: string;
  price: string;
  maxCapacity: string;
  status: string;
  image: File | null;
}

const useCreateEventHook = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  console.log(user?.token)

  const createEventMutation = useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
   
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("startDay", payload.startDay);
      formData.append("endDay", payload.endDay);
      formData.append("startTime", payload.startTime);
      formData.append("endTime", payload.endTime);
      formData.append("category", payload.category);
      formData.append("location", payload.location);
      formData.append("description", payload.description);
      formData.append("price", payload.price);
      formData.append("maxCapacity", payload.maxCapacity);
      formData.append("status", payload.status);
      formData.append("image", payload.image!);

      await axiosInstance.post("/api/create-event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },

    onSuccess: async () => {
      toast.success("Event created successfully!");
      router.replace("/organizer/dashboard");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return {
    createEventMutation,
  };
};

export default useCreateEventHook;
