import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";

export const Layout = () => {
  return (
    <div className="flex flex-col w-full justify-between h-screen">
      <div className="flex-flex-col">
        <Header />
        <Navbar />
        <div className="flex flex-col gap-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4">
        <div className="flex items-center justify-between sticky top-0 bg-background z-10 mb-4 pt-2 pb-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h2 className="capitalize text-2xl">Admin</h2>
          </div>
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
