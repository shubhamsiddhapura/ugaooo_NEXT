"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  

  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://ugaoo-next-js.vercel.app/api/product/getSectionWithSubSections")
      .then((response) => {
        setSections(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch navigation links");
        setLoading(false);
      });
  }, []);

  const handleProfileClick = () => {
    router.push("/login");
  };

  const formatPath = (name) =>
    `/${name.toLowerCase().replace(/\s+/g, "-")}`;

  if (loading) {
    return <nav className="p-4 bg-gray-100 text-center">Loading...</nav>;
  }

  if (error) {
    return (
      <nav className="p-4 bg-red-100 text-center text-red-700">
        Error: {error}
      </nav>
    );
  }

  return (
    <nav className="bg-green-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <Link href="/">
          <img src="/logo.avif" alt="Logo" className="h-14 sm:h-16" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 items-center">
          {sections.map((section) => (
            <li key={section.sectionId} className="relative group">
              <Link
                href={formatPath(section.sectionName)}
                className="text-black uppercase font-semibold hover:text-green-900 transition duration-200"
              >
                {section.sectionName}
              </Link>

              {section.subsections?.length > 0 && (
                <ul className="absolute left-0 mt-2 bg-green-50 shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-300 z-50 min-w-max">
                  {section.subsections.map((sub) => (
                    <li key={sub.subsectionId}>
                      <Link
                        href={`/subsection/${sub.subsectionId}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition duration-150"
                      >
                        {sub.subsectionName}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Profile & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleProfileClick}
            className="text-3xl text-gray-700 hover:text-blue-600 transition"
          >
            <CgProfile />
          </button>

          <button
            className="md:hidden text-3xl text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-green-50 border-t border-green-100">
          <ul className="flex flex-col space-y-4 mt-4">
            {sections.map((section) => (
              <li key={section.sectionId}>
                <details className="group">
                  <summary className="cursor-pointer font-semibold uppercase text-black">
                    {section.sectionName}
                  </summary>
                  {section.subsections?.length > 0 && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {section.subsections.map((sub) => (
                        <li key={sub.subsectionId}>
                          <Link
                            href={`/subsection/${sub.subsectionId}`}
                            className="text-gray-700 block hover:text-green-700"
                            onClick={() => setMenuOpen(false)}
                          >
                            {sub.subsectionName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </details>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
