import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/logo.avif";

const Navbar = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Toggle menu for mobile

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/section/getSectionWithSubSections")
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
    navigate("/login");
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
        <Link to="/">
          <img src={logo} alt="Logo" className="h-14 sm:h-16" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 items-center">
          {sections.map((section) => (
            <li key={section.sectionId} className="relative group">
              <Link
                to={formatPath(section.sectionName)}
                className="text-black uppercase font-semibold hover:text-green-900 transition duration-200"
              >
                {section.sectionName}
              </Link>

              {section.subsections && section.subsections.length > 0 && (
                <ul className="absolute left-0 mt-2 bg-green-50 shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-300 z-50 min-w-max">
                  {section.subsections.map((sub) => (
                    <li key={sub.subsectionId}>
                      <Link
                        to={`/subsection/${sub.subsectionId}`}
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

        {/* Profile Icon */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleProfileClick}
            className="text-3xl text-gray-700 hover:text-blue-600 transition"
          >
            <CgProfile />
          </button>

          {/* Hamburger Button (Mobile) */}
          <button
            className="md:hidden text-3xl text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-green-50 border-t border-green-100">
          <ul className="flex flex-col space-y-4 mt-4">
            {sections.map((section) => (
              <li key={section.sectionId}>
                <details className="group">
                  <summary className="cursor-pointer font-semibold uppercase text-black">
                    {section.sectionName}
                  </summary>
                  {section.subsections && section.subsections.length > 0 && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {section.subsections.map((sub) => (
                        <li key={sub.subsectionId}>
                          <Link
                            to={`/subsection/${sub.subsectionId}`}
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
