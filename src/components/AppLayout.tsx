import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import MobileNav from "./MobileNav";

const AppLayout = () => (
  <div className="flex min-h-svh bg-background">
    <AppSidebar />
    <div className="flex-1 flex flex-col min-w-0">
      <MobileNav />
      <main className="flex-1 p-6 lg:p-12 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AppLayout;
