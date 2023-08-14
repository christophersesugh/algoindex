import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#394264] flex items-center justify-center text-xl py-12 text-white">
      Copyright &copy; AlgoIndex {year}
    </footer>
  );
}
