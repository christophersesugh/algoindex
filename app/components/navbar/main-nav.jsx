import { Link, NavLink } from "@remix-run/react";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";

export function MainNav({ ...navProps }) {
  const { isNavOpen, setIsNavOpen, navLinks, user } = navProps;
  return (
    <nav className="bg-[#394264]">
      <div className="max-w-5xl mx-auto py-6 flex justify-between px-4  items-center text-white text-lg">
        <Link to="/">
          <button className="text-3xl font-black">
            {" "}
            Algo<span className="text-blue-400">Index</span>
          </button>
        </Link>
        <ul className="md:flex justify-between gap-6 hidden">
          {navLinks.map((item, index) => (
            <li key={`item-${index}`}>
              <NavLink
                to={item.link}
                className={({ isActive, isPending }) =>
                  isActive ? "text-blue-400 capitalize" : "capitalize"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to="/login">
          {user ? (
            <form action="/logout" method="post">
              <button className="hidden md:block capitalize p-2 bg-blue-400 rounded-xl text-white">
                log out
              </button>
            </form>
          ) : (
            <button className="hidden md:block capitalize p-2 bg-blue-400 rounded-xl text-white">
              log in
            </button>
          )}
        </Link>
        <button
          className="md:hidden text-xl"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <FaTimes /> : <AiOutlineBars />}
        </button>
      </div>
    </nav>
  );
}
