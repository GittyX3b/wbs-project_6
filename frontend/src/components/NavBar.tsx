import { PanelLeftOpen } from "lucide-react";
import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar w-full bg-base-300 flex justify-between pr-7 sticky top-0 z-10 shadow-lg">
      <label
        htmlFor="my-drawer-4"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
        <PanelLeftOpen className="is-drawer-close:hidden" />
      </label>
      <div className="px-4 text-2xl font-bold">Event Planner</div>

      {user && (
        <div className="flex items-center gap-2">
          <p className="text-xs">
            Hallo <strong>{user.email}</strong>
          </p>
          <button className="btn btn-xs" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      {!user && (
        <div>
          <NavLink to="login" className="btn btn-xs mr-2">
            Login
          </NavLink>
          <NavLink to="signup" className="btn btn-xs">
            Sign Up
          </NavLink>
        </div>
      )}
    </nav>
  );
}
