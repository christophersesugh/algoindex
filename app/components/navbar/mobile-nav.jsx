import { NavLink } from "@remix-run/react";
import React from "react";

export function MobileNav({ ...navProps }) {
  const { isNavOpen, setIsNavOpen, navLinks } = navProps;
  function handleNavclose() {
    setIsNavOpen(false);
  }
  return (
    <nav
      className={`md:hidden drop-shadow-lg absolute w-full bg-white py-4 ${
        isNavOpen ? "block" : "hidden"
      }`}
    >
      <ul className="flex flex-col items-center text-lg gap-6">
        {navLinks.map((item, index) => (
          <li key={`item-${index}`}>
            <NavLink
              onClick={handleNavclose}
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
    </nav>
  );
}
