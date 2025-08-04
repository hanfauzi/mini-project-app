// app/(dashboard)/events/[id]/_hooks/useUpdateEvent.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";

export interface UpdateEventPayload {
  title?: string;
  startDay?: string;
  endDay?: string;
  startTime?: string;
  endTime?: string;
  category?: string;
  location?: string;
  description?: string;
  maxCapacity?: string;
  status?: string;
  imageUrl?: File | null;
}

export interface UpdateEventFormValues {
  title?: string;
  startDay?: string;
  endDay?: string;
  startTime?: string;
  endTime?: string;
  category?: string;
  location?: string;
  description?: string;
  maxCapacity?: string;
  status?: string;
  imageUrl?: File | null;
}

export default function useUpdateEvent() {
  const { user } = useAuthStore();
  const params = useParams();
  const id = params.id;
  const queryClient = useQueryClient();
  const updateEventMutation = useMutation({
    mutationFn: async (payload: UpdateEventPayload) => {
      const formData = new FormData();
      if (payload.title) {
        formData.append("title", payload.title);
      }
      if (payload.startDay) {
        formData.append("startDay", payload.startDay);
      }
      if (payload.endDay) {
        formData.append("endDay", payload.endDay);
      }
      if (payload.startTime) {
        formData.append("startTime", payload.startTime);
      }
      if (payload.endTime) {
        formData.append("endTime", payload.endTime);
      }
      if (payload.category) {
        formData.append("category", payload.category);
      }
      if (payload.location) {
        formData.append("location", payload.location);
      }
      if (payload.description) {
        formData.append("description", payload.description);
      }
      if (payload.maxCapacity) {
        formData.append("maxCapacity", payload.maxCapacity);
      }
      if (payload.status) formData.append("status", payload.status);
      if (payload.imageUrl) {
        formData.append("image", payload.imageUrl);
      }

      await axiosInstance.patch(`/api/edit-event/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Event Updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["event", id] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });

  return { updateEventMutation };
}
