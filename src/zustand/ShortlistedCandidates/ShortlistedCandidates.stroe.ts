/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import api from "../axios/baseApi";

export interface ShortlistedCandidate {
  name: string;
  email: string;
  score: number;
  reasons: string[];
}

interface ShortlistedState {
  candidates: ShortlistedCandidate[];
  loading: boolean;
  error: string | null;

  getShortlistedCandidates: () => Promise<void>;
  clearCandidates: () => void;
}

export const useShortlistedStore = create<ShortlistedState>((set) => ({
  candidates: [],
  loading: false,
  error: null,

  //  FETCH SHORTLISTED CANDIDATES
  getShortlistedCandidates: async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/api/v1/analyze/cv");

      set({
        candidates: res.data.data || res.data,
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch shortlisted candidates",
      });
    }
  },

  //  CLEAR STORE
  clearCandidates: () => {
    set({ candidates: [] });
  },
}));
