"use client";
import { useEffect, useState } from "react";

import LinkButton from "./LinkButton";





const Header = () => {

  //currently not using this function
  /*
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };
  */

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 20) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

    // submenu handler
    /* currently not using this function
    const [openIndex, setOpenIndex] = useState(-1);
    const handleSubmenu = (index) => {
      if (openIndex === index) {
        setOpenIndex(-1);
      } else {
        setOpenIndex(index);
      }
    };
    */
  

  return (
    <header className={`header left-0 top-0 py-6 z-40 flex w-full items-center ${
      sticky
        ? "dark:bg-gray-800 dark:shadow-sticky-dark fixed z-[9999] !bg-opacity-60 shadow-sticky backdrop-blur-sm transition"
        : "absolute bg-transparent"
    }`}>
    <div className="container mx-2 md:mx-auto">
      <div className="relative mx-2 flex items-center justify-end">
        <ul className="flex gap-8">
          <LinkButton
            class="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 via-blue-300 to-teal-400 text-lg font-bold"
            link="/#"
            text="🌴 About Remix LA"
          />
          <LinkButton
            class="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 via-blue-200 to-red-300 text-lg font-bold"
            link="/login"
            text="🌴 Member Login"
          />
        </ul>
      </div>
    </div>
  </header>

  )
}
export default Header;