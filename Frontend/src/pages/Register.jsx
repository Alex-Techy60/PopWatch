// src/pages/Register.jsx
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError("");

    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar[0]); 
      if (data.coverImage && data.coverImage.length > 0) {
        formData.append("coverImage", data.coverImage[0]); 
      }

      const response = await api.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-xl bg-surface p-8 rounded-xl border border-gray-700 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h2>
        <p className="text-textMuted text-center mb-6">Join PopWatch today</p>

        {apiError && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm text-center">{apiError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-textMuted mb-1">Full Name</label>
              <input type="text" {...register("fullName", { required: true })} className="w-full px-4 py-2 bg-background border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm text-textMuted mb-1">Username</label>
              <input type="text" {...register("username", { required: true })} className="w-full px-4 py-2 bg-background border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-textMuted mb-1">Email</label>
            <input type="email" {...register("email", { required: true })} className="w-full px-4 py-2 bg-background border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary" />
          </div>

          <div>
            <label className="block text-sm text-textMuted mb-1">Password</label>
            <input type="password" {...register("password", { required: true, minLength: 6 })} className="w-full px-4 py-2 bg-background border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-sm text-textMuted mb-1">Avatar Image (Required)</label>
              <input type="file" accept="image/*" {...register("avatar", { required: true })} className="w-full text-sm text-textMuted file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-surface file:text-white file:border file:border-gray-600 cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm text-textMuted mb-1">Cover Image (Optional)</label>
              <input type="file" accept="image/*" {...register("coverImage")} className="w-full text-sm text-textMuted file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-surface file:text-white file:border file:border-gray-600 cursor-pointer" />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-3 mt-6 bg-primary hover:bg-primaryHover text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-textMuted">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;