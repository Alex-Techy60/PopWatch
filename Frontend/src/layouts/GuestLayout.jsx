// src/layouts/GuestLayout.jsx
// Can just pass through to Outlet since RootLayout handles global UI
import { Outlet } from 'react-router-dom';
export default function GuestLayout() { return <Outlet />; }