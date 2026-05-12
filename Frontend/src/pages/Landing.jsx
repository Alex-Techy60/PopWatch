// src/pages/Landing.jsx
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { continueAsGuest } from "../features/auth/authSlice";
import Navbar from "../components/Navbar";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Welcome to PopWatch
        </h1>
        <p className="text-lg text-textMuted max-w-2xl mb-10">
          A clean, fast, and simple video streaming platform. Sign in to your account or browse as a guest to get started.
        </p>
        
        <div className="flex gap-4">
          <button 
            onClick={() => navigate("/login")} 
            className="px-6 py-3 bg-primary hover:bg-primaryHover text-white font-semibold rounded-lg transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate("/register")} 
            className="px-6 py-3 bg-surface hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors border border-gray-600"
          >
            Create Account
          </button>
        </div>

        <button 
          onClick={() => dispatch(continueAsGuest())} 
          className="mt-8 text-textMuted hover:text-white transition-colors"
        >
          Continue as Guest &rarr;
        </button>
      </main>
    </div>
  );
};

export default Landing;