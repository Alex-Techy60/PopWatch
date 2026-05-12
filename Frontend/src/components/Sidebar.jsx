// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { FiHome, FiClock, FiThumbsUp, FiSettings } from "react-icons/fi";

const Sidebar = () => {
  const links = [
    { name: "Home", path: "/", icon: <FiHome size={20} /> },
    { name: "History", path: "/history", icon: <FiClock size={20} /> },
    { name: "Liked Videos", path: "/liked", icon: <FiThumbsUp size={20} /> },
    { name: "Settings", path: "/settings", icon: <FiSettings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-primary/10 flex flex-col pt-6 px-3">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all ${
              isActive ? "bg-primary/10 text-primary font-semibold" : "text-textMuted hover:bg-white/5 hover:text-textMain"
            }`
          }
        >
          {link.icon}
          <span>{link.name}</span>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;