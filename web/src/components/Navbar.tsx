"use client";

import Link from "next/link";
import { FaCode } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { PiListFill } from "react-icons/pi";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Why Us", href: "/gallery" },
  { name: "Showcase", href: "/service" },
  { name: "Features", href: "/service/#aboutme" },
  { name: "Get SysMastro", href: "/service/#price" },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 w-full z-50 ease-in duration-100 border-b-1 border-[#FFFFFF26] backdrop-blur-md bg-black/30 ${
        showNavbar ? "block" : "hidden"
      }`}
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-white">
        <FaCode
          className="text-4xl font-bold"
          style={{
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        />
        <ul className="hidden sm:flex">
          {navigation.map((item, index) => (
            <li key={index} className="p-4">
              <Link
                href={item.href}
                className="font-bold text-sm uppercase tracking-wider"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile */}
        <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <AiOutlineClose size={20} className="text-white" />
          ) : (
            <PiListFill size={20} className="text-black" />
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
              : "sm:hidden absolute -top-[900px] left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
          }
        >
          <ul>
            {navigation.map((item, index) => (
              <li key={index} onClick={handleNav} className="p-4 text-4xl">
                <Link
                  href={item.href}
                  className="link-underline link-underline:hover"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
