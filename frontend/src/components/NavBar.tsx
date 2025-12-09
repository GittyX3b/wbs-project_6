import { PanelLeftOpen } from "lucide-react";
import { NavLink } from "react-router";

export function NavBar() {
  return (
    <nav className="navbar w-full bg-base-300 flex justify-between px-7">
      <label
        htmlFor="my-drawer-4"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
        <PanelLeftOpen className="is-drawer-close:hidden" />
      </label>
      <div className="px-4 text-2xl font-bold">Event Planner</div>
      <div>
        {/* TODO: if already signed in ? show avatar an username */}
        <NavLink to="login" className="btn btn-xs mr-2">
          Login
        </NavLink>
        <NavLink to="signup" className="btn btn-xs ">
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
}
