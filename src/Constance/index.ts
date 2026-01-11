import { Brain, MessageSquare, BarChart3, Target, Code2, Users } from "lucide-react";

export const features = [
  {
    icon: Brain,
    title: "AI-Powered Questions",
    description: "Dynamic questions that adapt to your skill level and chosen tech stack.",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Feedback",
    description: "Get instant, detailed feedback on your answers with improvement suggestions.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed analytics and insights.",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    description: "Identify weak areas and get personalized recommendations to improve.",
  },
  {
    icon: Code2,
    title: "Role-Based Practice",
    description: "Tailored questions for Frontend, Backend, or Fullstack positions.",
  },
  {
    icon: Users,
    title: "Mock Interviews",
    description: "Simulate real interview scenarios with time pressure and follow-ups.",
  },
];


export const steps = [
  {
    step: "01",
    title: "Choose Your Role",
    description: "Select Frontend, Backend, or Fullstack. Pick your experience level and preferred technologies.",
  },
  {
    step: "02",
    title: "Practice Interviews",
    description: "Answer AI-generated questions in a realistic interview environment with time constraints.",
  },
  {
    step: "03",
    title: "Get AI Feedback",
    description: "Receive detailed analysis of your answers with specific suggestions for improvement.",
  },
  {
    step: "04",
    title: "Track & Improve",
    description: "Review your progress, identify patterns, and focus on areas that need the most work.",
  },
];


export type ROLE = {
  user:"USER",
  admin:"ADMIN"
}