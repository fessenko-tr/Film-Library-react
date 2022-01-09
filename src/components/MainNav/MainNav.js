import { NavLink } from "react-router-dom";
import s from "./MainNav.module.css";

function MainNav() {
  const { ActiveLink } = s;

  return (
    <>
      <NavLink
        className={({ isActive }) => (isActive ? ActiveLink : "")}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? ActiveLink : "")}
        to="/movies"
      >
        Movies
      </NavLink>
    </>
  );
}

export default MainNav;
