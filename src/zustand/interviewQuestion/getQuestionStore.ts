/* eslint-disable @typescript-eslint/no-explicit-any */
type QuestionItem = {
  question: string;
  type: string;
};

type InterviewSession = {
  _id: string;
  userEmail: string;
  jobType: string;
  description: string;
  duration: string;
  questions: QuestionItem[];
};

type CandidateInfo = {
  name: string;
  email: string;
};

type QuestionStore = {
  session: InterviewSession | null;
  feedback: any[];
  loading: boolean;
  error: string | null;
  candidateInfo: CandidateInfo;

  fetchQuestion: (data: any) => Promise<void>;
  fetchFeedback: (payload: any) => Promise<void>;
  getSession: (id: string) => Promise<void>;
  setCandidateInfo: (payload: CandidateInfo) => void;
};


import { create } from "zustand";
import api from "../axios/baseApi";

const questionStore = create<QuestionStore>((set) => ({
  session: null,
  feedback: [],
  loading: false,
  error: null,

  candidateInfo: {
    name: "",
    email: "",
  },

  fetchQuestion: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/api/v1/interview/start-interview", data);
      set({
        session: res.data?.data ?? null,
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || error.message,
      });
    }
  },

  fetchFeedback: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/api/v1/interview/feedback", payload);
      set({
        feedback: res.data?.data ?? [],
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || error.message,
      });
    }
  },

  getSession: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/api/v1/interview/single-session/${id}`);
      set({
        session: res.data?.data ?? null,
        loading: false,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || error.message,
      });
    }
  },

  setCandidateInfo: ({ name, email }) =>
    set({
      candidateInfo: { name, email },
    }),
}));

export default questionStore;
