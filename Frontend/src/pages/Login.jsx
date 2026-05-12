// src/pages/Login.jsx
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setLoading } from "../features/auth/authSlice";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const isAuthLoading = useSelector((state) => state.auth.loading);

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    setApiError("");
    try {
      const response = await api.post("/users/login", data);
      if (response.data.success) {
        dispatch(loginSuccess(response.data.data.user));
        navigate("/");
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "Login failed.");
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface p-8 rounded-xl border border-gray-700 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Sign In</h2>
        <p className="text-textMuted text-center mb-6">Welcome back to PopWatch</p>

        {apiError && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm text-center">{apiError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-textMuted mb-1">Email or Username</label>
            <input 
              type="text" 
              {...register("username", { required: "Required" })}
              className="w-full px-4 py-2 bg-background border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
            />
            {errors.username && <span className="text-red-400 text-xs mt-1 block">{errors.username.message}</span>}
          </div>

          <div>
            <label className="block text-sm text-textMuted mb-1">Password</label>
            <input 
              type="password" 
              {...register("password", { required: "Required" })}
              className="w-full px-4 py-2 bg-background border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
            />
            {errors.password && <span className="text-red-400 text-xs mt-1 block">{errors.password.message}</span>}
          </div>

          <button 
            type="submit" 
            disabled={isAuthLoading}
            className="w-full py-3 mt-4 bg-primary hover:bg-primaryHover text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {isAuthLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-textMuted">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;