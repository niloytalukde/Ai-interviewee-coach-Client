import AdminDashboard from "@/Pages/Admin/AdminDashboard";
export const adminSidebarItems=[
    {
      title: "Getting Started",
      url: "/admin",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          Component:AdminDashboard
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
  ]