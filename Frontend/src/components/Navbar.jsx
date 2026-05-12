// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full p-6 flex justify-between items-center bg-background border-b border-surface">
      <Link to="/" className="text-2xl font-bold text-white">
        PopWatch
      </Link>
    </nav>
  );
};

export default Navbar;