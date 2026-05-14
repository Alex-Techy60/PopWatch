// src/pages/Register.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Upload } from 'lucide-react'; // Added Upload icon
import toast from 'react-hot-toast';
import authService from '@/services/authService';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, "Alphanumeric and underscore only"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Minimum 8 chars").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, "Needs uppercase, lowercase, number, & special char"),
});

export default function Register() {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data) => {
    if (!avatarFile) return toast.error("Profile avatar is required");
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      formData.append('avatar', avatarFile);
      await authService.register(formData);
      toast.success("Account created successfully! Please sign in.");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 text-text-primary">Create an account</h2>
        <p className="text-text-secondary">Join PopWatch today. It's free!</p>
      </div>

      {/* Premium Avatar Upload Zone */}
      <div className="flex justify-center mb-6 relative group w-max mx-auto">
        <label className="w-24 h-24 rounded-full border-2 border-dashed border-primary/50 bg-surface/50 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]">
          {avatarFile ? (
            <img src={URL.createObjectURL(avatarFile)} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <>
              <Upload size={24} className="text-primary mb-1 opacity-80 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[10px] text-text-secondary font-medium uppercase tracking-wider">Avatar</span>
            </>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={e => setAvatarFile(e.target.files[0])} />
        </label>
        {avatarFile && (
          <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1.5 shadow-lg pointer-events-none">
            <Upload size={12} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input placeholder="Full Name" {...register('fullName')} error={errors.fullName} />
        <Input placeholder="Username" {...register('username')} error={errors.username} />
      </div>
      
      <Input placeholder="Email Address" type="email" {...register('email')} error={errors.email} />
      <Input placeholder="Create Password" type="password" {...register('password')} error={errors.password} />
      
      <Button type="submit" className="w-full py-3 text-base shadow-lg shadow-primary/20 mt-4" isLoading={isSubmitting}>
        Create Account
      </Button>
      
      <p className="text-center text-sm text-text-secondary mt-6">
        Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
      </p>
    </form>
  );
}