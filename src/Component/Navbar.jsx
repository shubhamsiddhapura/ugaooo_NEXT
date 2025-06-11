"use client";

import { useEffect, useState, useRef } from "react";
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
  const [hoveredSection, setHoveredSection] = useState(null);
  const timeoutRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/getSectionWithSubSections")
      .then((res) => {
        setSections(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching menu");
        setLoading(false);
      });
  }, []);

  const formatPath = (name) => `/${name.toLowerCase().replace(/\s+/g, "-")}`;

  const handleMouseEnter = (id) => {
    clearTimeout(timeoutRef.current);
    setHoveredSection(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredSection(null);
    },100);
  }

  const handleProfileClick = () => router.push("/login");

  if (loading) return <nav className="p-4 text-center">Loading...</nav>;
  if (error)
    return (
      <nav className="p-4 text-center text-red-600 bg-red-100">Error: {error}</nav>
    );

  return (
    <nav className="shadow-md bg-green-50">
      <div className="flex items-center justify-between h-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link href="/">
          <img src="/logo.avif" alt="Logo" className="h-14 sm:h-16" />
        </Link>
        <ul className="items-center hidden space-x-6 md:flex">
          {sections.map((section) => (
            <li
              key={section.sectionId}
              className="relative"
              onMouseEnter={() => handleMouseEnter(section.sectionId)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={formatPath(section.sectionName)}
                className="font-semibold text-black uppercase transition hover:text-green-900"
              >
                {section.sectionName}
              </Link>
              {section.subsections?.length > 0 && hoveredSection === section.sectionId && (
                <ul className="absolute left-0 z-50 mt-2 transition duration-200 bg-white border shadow top-full min-w-max">
                  {section.subsections.map((sub) => (
                    <li key={sub.subsectionId}>
                      <Link
                        href={`/subsection/${sub.subsectionId}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-100"
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
        <div className="flex items-center space-x-4">
          <button
            onClick={handleProfileClick}
            className="text-3xl text-gray-700 hover:text-green-700"
          >
            <CgProfile />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-gray-700 md:hidden"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="px-4 pb-4 border-t border-green-100 md:hidden bg-green-50">
          <ul className="flex flex-col mt-4 space-y-4">
            {sections.map((section) => (
              <li key={section.sectionId}>
                <Link
                  href={formatPath(section.sectionName)}
                  className="block mb-1 font-semibold text-black uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  {section.sectionName}
                </Link>
                {section.subsections?.length > 0 && (
                  <ul className="ml-4 space-y-2">
                    {section.subsections.map((sub) => (
                      <li key={sub.subsectionId}>
                        <Link
                          href={`/subsection/${sub.subsectionId}`}
                          className="block text-gray-700 hover:text-green-700"
                          onClick={() => setMenuOpen(false)}
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
