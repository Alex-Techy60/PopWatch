// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, Upload, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux'; // Switched to Redux
import SearchBar from './SearchBar';
import Button from './ui/Button';
import Avatar from './ui/Avatar';
import { useState } from 'react';
import { logout } from '@/features/auth/authSlice';

export default function Navbar({ toggleSidebar }) {
  // Read auth state directly from the Redux store
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 w-full h-16 bg-surface/90 backdrop-blur-md border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Button variant="icon" onClick={toggleSidebar} aria-label="Toggle Menu">
          <Menu />
        </Button>
        <Link to="/" className="flex items-center gap-2">
          {/* REPLACE this src with the path to your actual logo file (e.g., .png or .svg) */}
          <img src="/src/assets/logo.svg" alt="PopWatch Logo" className="h-8 w-auto drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
          <span className="text-xl font-bold tracking-tight text-text-primary hidden sm:block">PopWatch</span>
        </Link>
      </div>

      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <SearchBar />
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {!isAuthenticated ? (
          <>
            <Link to="/login"><Button variant="ghost">Sign In</Button></Link>
            <Link to="/register"><Button variant="primary">Sign Up</Button></Link>
          </>
        ) : (
          <>
            <Button variant="icon"><Upload size={20} /></Button>
            <Button variant="icon"><Bell size={20} /></Button>
            
            <div className="relative">
              {/* Beautiful Tag: Avatar + Username Pill */}
              <div 
                className="flex items-center gap-3 cursor-pointer bg-surface hover:bg-surface-elevated p-1 rounded-full pr-4 transition-all duration-300 border border-border hover:border-primary/50 shadow-sm"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Avatar src={user?.avatar} size="md" className="border-2 border-primary/20" />
                <span className="text-sm font-medium hidden md:block text-text-primary">
                  {user?.username || 'Creator'}
                </span>
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-surface-elevated border border-border rounded-md shadow-lg py-1 z-50">
                  <Link to={`/channel/${user?.username}`} className="flex items-center px-4 py-2 text-sm hover:bg-surface"><User size={16} className="mr-2"/> My Channel</Link>
                  <Link to="/settings" className="flex items-center px-4 py-2 text-sm hover:bg-surface"><SettingsIcon size={16} className="mr-2"/> Settings</Link>
                  <div className="my-1 border-t border-border" />
                  <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-surface"><LogOut size={16} className="mr-2"/> Logout</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}