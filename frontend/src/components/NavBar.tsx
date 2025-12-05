import { NavLink } from "react-router";

export function NavBar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="signup">Sign Up</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
