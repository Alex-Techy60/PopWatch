// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
export default function NotFound() { 
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl mb-6">Page not found</p>
      <Link to="/" className="text-primary hover:underline">Go Home</Link>
    </div>
  );
}