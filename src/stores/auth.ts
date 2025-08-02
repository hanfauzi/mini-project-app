import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserStore extends User {
  token: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  referralCode?: string;
  orgName?: string;
  imageUrl?: string;
  logoUrl?:string;
  bio?:string;
  address?:string
}

type Store = {
  user: UserStore | null;
  onAuthSuccess: ({ user }: { user: UserStore }) => void;
  clearAuth: () => void;

  // Helper functions
  isUser: () => boolean;
  isOrganizer: () => boolean;
  isLoggedIn: () => boolean;
};

export const useAuthStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,

      onAuthSuccess: ({ user }) => {
        set(() => ({
          user: { ...user },
        }));
      },

      clearAuth: () => set(() => ({ user: null })),

      isUser: () => get().user?.role === "USER",
      isOrganizer: () => get().user?.role === "ORGANIZER",
      isLoggedIn: () => !!get().user,
    }),
    { name: "tickly-store" }
  )
);
