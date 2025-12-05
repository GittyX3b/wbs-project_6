import { Outlet } from "react-router";
import { NavBar } from "../components/NavBar";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export { MainLayout };
