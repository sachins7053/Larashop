"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import  { MainNav }  from "@/components/AdminSIdebar/MainNav"
import { NavUser } from "@/components/AdminSIdebar/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePage } from "@inertiajs/react"

// This is sample data.
const data = {

  navMain: [
    {
      title: "Products",
      url: "#",
      icon: SquareTerminal,
      isActive: route()?.current('product.index') || route().current('product.add') || route().current('bulkproduct.add') || route().current('bulkproduct.status'),
      items: [
        {
          title: "All Products",
          url: route('product.index'),
        },
        {
          title: "Add Product",
          url: route('product.add'),
        },
        {
          title: "Add Bulk Product",
          url: route('bulkproduct.add'),
        },
        {
          title: "Bulk Product status",
          url: route('bulkproduct.status'),
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = usePage().props.auth.user;
  return (
    <Sidebar collapsible="icon" {...props} className="text-indigo-300 bg-indigo-900">
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent className="text-indigo-300 bg-indigo-900">
        <MainNav items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
