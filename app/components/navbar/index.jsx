import React from "react";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function NavBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const navProps = { isNavOpen, setIsNavOpen, navLinks };
  return (
    <div className="relative">
      <MainNav {...navProps} />
      <MobileNav {...navProps} />
    </div>
  );
}

const navLinks = [
  { name: "home", link: "/" },
  { name: "DSA", link: "/dsa" },
  { name: "about algoIndex", link: "/about" },
];
