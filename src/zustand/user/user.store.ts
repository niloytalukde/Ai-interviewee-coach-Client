/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../axios/baseApi";

type User = {
  data: {
    id: string;
    name: string;
    email: string;
    accessToken?: string;
  };
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type UserStore = {
  loading: boolean;
  error: string | null;
  user: User | null;

  createUser: (data: RegisterPayload) => Promise<void>;
  loginUser: (data: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const userStore = create<UserStore>()(
  persist(
    (set) => ({
      loading: false,
      error: null,
      user: null,

      createUser: async (data) => {
        set({ loading: true, error: null });
        try {
          const res = await api.post("/api/v1/auth/register", data);
          set({ user: res.data, loading: false });
        } catch (error: any) {
          set({
            loading: false,
            error: error?.response?.data?.message || "Registration failed",
          });
        }
      },

      loginUser: async (payload) => {
        set({ loading: true, error: null });
        try {
          const res = await api.post("/api/v1/auth/login", payload);
          set({ user: res.data, loading: false });
        } catch (error: any) {
          set({
            loading: false,
            error: error?.response?.data?.message || "Login failed",
          });
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await api.post("/api/v1/auth/logout");
          set({ user: null, loading: false });
        } catch {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-store", // key in localStorage
      partialize: (state) => ({ user: state.user }), // only persist user
    }
  )
);

export default userStore;
