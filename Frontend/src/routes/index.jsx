// src/routes/index.jsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute';
import Spinner from '@/components/ui/Spinner';

const Home = lazy(() => import('@/pages/Home'));
const VideoWatch = lazy(() => import('@/pages/VideoWatch'));
const Channel = lazy(() => import('@/pages/Channel'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Subscriptions = lazy(() => import('@/pages/Subscriptions'));
const WatchHistory = lazy(() => import('@/pages/WatchHistory'));
const Playlists = lazy(() => import('@/pages/Playlists'));
const Settings = lazy(() => import('@/pages/Settings'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const suspenseWrap = (Component) => (
  <Suspense fallback={<div className="flex h-full w-full items-center justify-center pt-20"><Spinner /></div>}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: suspenseWrap(Home) },
      { path: '/watch/:videoId', element: suspenseWrap(VideoWatch) },
      { path: '/channel/:username', element: suspenseWrap(Channel) },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/subscriptions', element: suspenseWrap(Subscriptions) },
          { path: '/history', element: suspenseWrap(WatchHistory) },
          { path: '/playlists', element: suspenseWrap(Playlists) },
          { path: '/settings', element: suspenseWrap(Settings) },
        ],
      },
      { path: '*', element: suspenseWrap(NotFound) },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: suspenseWrap(Login) },
      { path: '/register', element: suspenseWrap(Register) },
    ],
  },
]);