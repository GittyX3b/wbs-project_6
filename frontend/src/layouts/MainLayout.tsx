import { Outlet } from "react-router";
import { NavBar } from "@components";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export { MainLayout };
