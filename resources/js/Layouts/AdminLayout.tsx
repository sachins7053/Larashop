import { AppSidebar } from "@/components/AdminSIdebar/AppSidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { PropsWithChildren, ReactNode } from "react"
import { Link } from "@inertiajs/react"

export function AdminLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }> ) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 shadow-lg transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={route('dashboard')}>
                           Dashboard
                        </BreadcrumbLink>
                        </BreadcrumbItem>
                    {header && (
                        <>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                        <BreadcrumbPage>{header}</BreadcrumbPage>
                        </BreadcrumbItem>
                        </>
                )}
                    </BreadcrumbList>
                </Breadcrumb>
          </div>
        </header>
        <Toaster />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
