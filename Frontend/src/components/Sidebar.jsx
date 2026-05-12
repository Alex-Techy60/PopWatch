// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, TrendingUp, Compass, Users, History, ThumbsUp, ListVideo } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/utils/cn';

export default function Sidebar({ collapsed }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const guestLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Trending', path: '/trending', icon: TrendingUp },
    { name: 'Explore', path: '/explore', icon: Compass },
  ];

  const authLinks = [
    { name: 'Subscriptions', path: '/subscriptions', icon: Users },
    { name: 'History', path: '/history', icon: History },
    { name: 'Liked', path: '/liked', icon: ThumbsUp },
    { name: 'Playlists', path: '/playlists', icon: ListVideo },
  ];

  const links = isAuthenticated ? [...guestLinks, ...authLinks] : guestLinks;

  return (
    <motion.aside 
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-surface border-r border-border overflow-hidden z-30"
    >
      <div className="flex flex-col py-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "flex items-center px-6 py-3 hover:bg-surface-elevated transition-colors",
                isActive && "bg-surface-elevated border-l-4 border-primary text-primary"
              )}
            >
              <Icon size={24} className={cn("shrink-0", isActive ? "text-primary" : "text-text-secondary")} />
              {!collapsed && <span className="ml-4 whitespace-nowrap">{link.name}</span>}
            </Link>
          );
        })}
      </div>
    </motion.aside>
  );
}