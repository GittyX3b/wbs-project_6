import { Outlet } from "react-router";
import { NavBar, NavDrawer } from "@components";

const MainLayout = () => {
  return (
    <div className="w-full">
      <div className="drawer lg:drawer-open maxwidth-app m-auto">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <NavBar />
          <main className="pt-10 md:pt-20 p-10">
            <Outlet />
          </main>
        </div>
        <NavDrawer />
      </div>
    </div>
  );
};

export { MainLayout };
