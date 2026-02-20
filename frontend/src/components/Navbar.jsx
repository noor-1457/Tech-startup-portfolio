import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#bf00ff] w-full h-[70px] flex items-center px-6 md:px-12 fixed top-0 left-0 z-50 shadow-md">
      {/* Logo */}
      <Link to="/" className="text-white text-2xl font-bold">
        Tech Startup
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex ml-auto items-center gap-8 text-white">
        <li>
          <Link to="/" className="hover:text-[#873260] transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-[#873260] transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link
            to="/services"
            className="hover:text-[#873260] transition-colors"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            to="/inquiries"
            className="hover:text-[#873260] transition-colors"
          >
            Inquiry
          </Link>
        </li>
        <li>
          <Link
            to="/case-studies"
            className="hover:text-[#873260] transition-colors"
          >
            Case Studies
          </Link>
        </li>
        <li>
          <Link to="/blog" className="hover:text-[#873260] transition-colors">
            Blog
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="hover:text-[#873260] transition-colors"
          >
            Contact
          </Link>
        </li>

        <Link to="/signup">
          <button className="bg-gradient-to-r from-[#78184a] to-[#7C3AED] text-white px-5 py-2 rounded-full hover:opacity-90 transition">
            Sign Up
          </button>
        </Link>
      </ul>

      {/* Mobile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="ml-auto md:hidden text-white text-2xl"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[70px] left-0 w-full bg-[#F9FAFB] md:hidden shadow-lg">
          <ul className="flex flex-col items-center gap-6 py-6 text-[#111827]">
            <Link
              to="/"
              className="hover:border-black transition-colors"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-[#873260] transition-colors"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="hover:text-[#873260] transition-colors"
              onClick={() => setOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/case-studies"
              className="hover:text-[#873260] transition-colors"
              onClick={() => setOpen(false)}
            >
              Case Studies
            </Link>
            <Link
              to="/blog"
              className="hover:text-[#873260] transition-colors"
              onClick={() => setOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#873260] transition-colors"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>

            <Link to="/signup" onClick={() => setOpen(false)}>
              <button className="bg-gradient-to-r from-[#78184a] to-[#7C3AED] text-white px-6 py-2 rounded-full hover:opacity-90 transition">
                Sign Up
              </button>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
