// src/pages/Register.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '@/services/authService';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, "Alphanumeric and underscore only"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 chars").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, "Must contain uppercase, lowercase, number, special char"),
});

export default function Register() {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data) => {
    if (!avatarFile) return toast.error("Avatar is required");
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      formData.append('avatar', avatarFile);
      await authService.register(formData);
      toast.success("Account created! Please login.");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      <div className="flex justify-center mb-4">
        <label className="w-24 h-24 rounded-full border-2 border-dashed border-primary flex items-center justify-center cursor-pointer overflow-hidden">
          {avatarFile ? <img src={URL.createObjectURL(avatarFile)} alt="Avatar" className="w-full h-full object-cover" /> : <span className="text-xs text-text-secondary text-center">Upload<br/>Avatar</span>}
          <input type="file" className="hidden" accept="image/*" onChange={e => setAvatarFile(e.target.files[0])} />
        </label>
      </div>
      <Input placeholder="Full Name" {...register('fullName')} error={errors.fullName} />
      <Input placeholder="Username" {...register('username')} error={errors.username} />
      <Input placeholder="Email" type="email" {...register('email')} error={errors.email} />
      <Input placeholder="Password" type="password" {...register('password')} error={errors.password} />
      <Button type="submit" className="w-full" isLoading={isSubmitting}>Sign Up</Button>
      <p className="text-center text-sm text-text-secondary mt-4">
        Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
      </p>
    </form>
  );
}