import { Outlet, useLocation } from "react-router";

import { useEffect } from "react";
import { NavBar, NavDrawer, Footer } from "@components";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="w-full">
      <div className="drawer lg:drawer-open maxwidth-app m-auto">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <NavBar />
          <main className=" min-h-screen pb-80">
            <Outlet />
          </main>
        </div>
        <Footer />
        <NavDrawer />
      </div>
    </div>
  );
};

export { MainLayout };
