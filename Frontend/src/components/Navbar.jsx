// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Upload, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import SearchBar from './SearchBar';
import Button from './ui/Button';
import Avatar from './ui/Avatar';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';

export default function Navbar({ toggleSidebar }) {
  const { isAuthenticated, user } = useAuth();
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
          <img src="/src/assets/logo.svg" alt="PopWatch" className="h-8" />
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
              <Avatar src={user?.avatar} onClick={() => setShowDropdown(!showDropdown)} />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-surface-elevated border border-border rounded-md shadow-lg py-1 z-50">
                  <Link to={`/channel/${user?.username}`} className="flex items-center px-4 py-2 text-sm hover:bg-surface"><User size={16} className="mr-2"/> My Channel</Link>
                  <Link to="/settings" className="flex items-center px-4 py-2 text-sm hover:bg-surface"><SettingsIcon size={16} className="mr-2"/> Settings</Link>
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