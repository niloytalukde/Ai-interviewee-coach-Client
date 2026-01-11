import App from "@/App";
import dashboardLayout from "@/components/dashbord/DashboardLayout";
import Home from "@/Pages/Public/Home";
import InterviewBoard from "@/Pages/Public/InterviewBoard";
import Login from "@/Pages/Public/Login";
import { generateRoute } from "@/utils/genarateRoute";
import { createBrowserRouter } from "react-router";
import { userSidebarItems } from "./userSidebar";
import { adminSidebarItems } from "./adminSidebarItems";
import StartInterview from "@/Pages/Public/StartInterview";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
       path:"/sign-in",
       Component:Login
      },

      {
       path:"/interview-board/:id",
       Component:InterviewBoard
      },
       
      {
       path:"/start-interview/:id",
       Component:StartInterview
      },
    ],
  },

{
  path:"/user",
  Component:dashboardLayout,
  children:generateRoute(userSidebarItems),
},

{ 
  path:"/admin",
  Component:dashboardLayout,
  children:generateRoute(adminSidebarItems)
}


]);
