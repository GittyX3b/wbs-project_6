import { NavLink } from "react-router";
import { House, CalendarPlus2, CalendarDays } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

export function NavDrawer() {
  const { user } = useAuth();

  return (
    <div className="drawer-side is-drawer-close:overflow-visible shadow-lg">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-50">
        {/* Sidebar content here */}
        <ul className="menu w-full grow pt-4">
          {/* List item */}
          <li>
            <NavLink
              to="/"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right mb-5"
              data-tip="Home"
            >
              {/* Home icon */}
              <House size={22} />
              <span className="is-drawer-close:hidden">Home</span>
            </NavLink>
          </li>

          {/* List item  #TODO: hide until loggedIn*/}
          {user && (
            <li>
              <NavLink
                to="my-events"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Events"
              >
                <CalendarDays size={22} />
                <span className="is-drawer-close:hidden w-20">My Events</span>
              </NavLink>
            </li>
          )}
          {/* List item  #TODO: hide until loggedIn*/}
          {user && (
            <li>
              <NavLink
                to="create-event"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="CreateEvent"
              >
                <CalendarPlus2 size={22} />
                <span className="is-drawer-close:hidden w-30">
                  Create Event
                </span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
