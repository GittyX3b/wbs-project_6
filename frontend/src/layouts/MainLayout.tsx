import { Outlet } from "react-router";
import { NavBar, NavDrawer } from "@components";

const MainLayout = () => {
  return (
    <div className="border w-full">
      <div className="drawer lg:drawer-open bg-red-200 maxwidth-1600 m-auto">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <NavBar />
          <main className="p-4">
            <Outlet />
          </main>
        </div>
        <NavDrawer />
      </div>
    </div>
  );
};

export { MainLayout };
