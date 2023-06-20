import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const NavBar = () => {
  const { isLoggedIn, logout, username } = useAuth();

  return (
    <nav className="flex flex-row justify-between items-end p-8 bg-slate-600 text-white w-full z-10 fixed top-0 left-0">
      <NavLink to="/" className="text-2xl font-bold">
        LearnHub
      </NavLink>
      {isLoggedIn ? (
        <div className="text-xl">
          <button onClick={logout} type="button">
            Logout
          </button>
        </div>
      ) : (
        <NavLink to="/login" className="text-xl">
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
