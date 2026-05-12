// src/layouts/RootLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function RootLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} />
        <main 
          className="flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300"
          style={{ marginLeft: sidebarCollapsed ? '72px' : '240px' }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}