/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios from "axios";

interface UploadCvState {
  loading: boolean;
  error: string | null;
  success: boolean;

  uploadCv: (formData: FormData) => Promise<void>;
  reset: () => void;
}

const uploadCvStore = create<UploadCvState>((set) => ({
  loading: false,
  error: null,
  success: false,

  uploadCv: async (formData: FormData) => {
    try {
      set({ loading: true, error: null, success: false });

      const res = await axios.post(
        "http://localhost:5000/api/v1/sort-out/upload",
        formData,  { withCredentials: true }
      );

      console.log("Upload success:", res.data);

      set({ success: true });
    } catch (error: any) {
      set({
        error:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      });
    } finally {
      set({ loading: false });
    }
  },

  reset: () => {
    set({ loading: false, error: null, success: false });
  },
}));

export default uploadCvStore;
