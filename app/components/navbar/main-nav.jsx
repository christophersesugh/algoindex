import { Link, NavLink } from "@remix-run/react";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";

export function MainNav({ ...navProps }) {
  const { isNavOpen, setIsNavOpen, navLinks } = navProps;
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
