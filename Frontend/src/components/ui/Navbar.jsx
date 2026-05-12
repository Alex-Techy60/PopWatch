// src/components/ui/Navbar.jsx
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../features/auth/authSlice";
import api from "../../api/axios";

const Navbar = ({ variant = "default" }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
      dispatch(logoutSuccess());
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (variant === "minimal") {
    return (
      <nav className="w-full p-6 flex justify-between items-center relative z-30">
        <div className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primaryGlow to-white drop-shadow-[0_0_15px_rgba(232,121,249,0.5)]">
          PopWatch.
        </div>
        <div className="font-tech text-xs tracking-widest text-textMuted uppercase hidden sm:block">
          STATUS::[ONLINE]
        </div>
      </nav>
    );
  }

  // Default Navbar for inside the app
  return (
    <nav className="h-16 bg-surface border-b border-primary/20 flex items-center justify-between px-6 sticky top-0 z-50">
      <Link to="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primaryGlow to-white">
        PopWatch
      </Link>
      
      <div className="flex items-center gap-4 font-tech">
        {user ? (
          <>
            <span className="text-xs text-textMuted uppercase hidden sm:block">NODE::{user.username}</span>
            <button onClick={handleLogout} className="text-xs font-bold text-red-400 hover:text-red-300 hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.8)] transition-all uppercase tracking-wider">
              TERMINATE_SESSION
            </button>
          </>
        ) : (
          <Link to="/login" className="text-xs font-bold text-primaryGlow hover:text-white transition-colors uppercase tracking-wider">
            AUTHORIZE
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;