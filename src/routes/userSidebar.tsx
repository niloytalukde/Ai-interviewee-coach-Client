import AllInterview from "@/Pages/User/Allnterview";
import Billing from "@/Pages/User/Billing";
import CreateInterview from "@/Pages/User/CreateInterview";
import Dashboard from "@/Pages/User/Dashboard";
import InterviewLinks from "@/Pages/User/InterviewLinks";
import ScheduledInterview from "@/Pages/User/ScheduledInterview";
import ShortlistedCandidates from "@/Pages/User/ShortlistedCandidates";
import CreateLink from "@/Pages/User/_component/CreateLink";

export const userSidebarItems=[
    {
      title: "",
      url: "/user",
      items: [
        {
          title: "Dashboard",
          url: "/user/dashboard",
          Component:Dashboard
        },
          {
          title: "Shortlisted Candidates",
          url: "/user/shortlisted-candidates",
          Component:ShortlistedCandidates
        },
        {
          title: "Scheduled Interview",
          url: "/user/scheduled-interview",
          Component:ScheduledInterview
        },
         {
          title: "All Interviews",
          url: "/user/all-interviews",
          Component:AllInterview
        },
        {
          title: "Create Interview",
          url: "/user/create-interview",
          Component:CreateInterview
        },
        {
          title: "Interview Links",
          url: "/user/interview-link",
          Component:InterviewLinks
        },
         {
          title: "Interview Links",
          url: "/user/interview-link/:id",
          Component:CreateLink,
          hideInSidebar: true, 
        },
        {
          title: "Billing",
          url: "/user/billing",
          Component:Billing
        }
      ],
    },
   
  ]