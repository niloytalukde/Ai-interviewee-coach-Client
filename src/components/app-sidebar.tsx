import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import { userSidebarItems } from "@/routes/userSidebar";
import { Brain } from "lucide-react";

// This is sample data.
const data = {
  navMain: userSidebarItems,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = useLocation();
  console.log(path.pathname);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Brain className="h-5 w-5" />
            </div>
          </Link>
          <span className="text-xl font-bold text-foreground">InterviewAI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="p-2">
                {item.items
                  .filter((item) => !item.hideInSidebar)
                  .map((item) => (
                    <SidebarMenuItem className="font-medium" key={item.title}>
                      <SidebarMenuButton
                        className={`${
                          path.pathname === item.url && "bg-primary text-white"
                        }`}
                        asChild
                      >
                        <Link to={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
