// src/pages/Login.jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '@/services/authService';
import { setCredentials } from '@/features/auth/authSlice';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const loginSchema = z.object({
  identifier: z.string().min(1, "Email or Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await authService.login(data.identifier, data.password);
      dispatch(setCredentials(res.data.data));
      toast.success("Welcome back!");
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      <Input placeholder="Email or Username" {...register('identifier')} error={errors.identifier} />
      <Input type="password" placeholder="Password" {...register('password')} error={errors.password} />
      <Button type="submit" className="w-full" isLoading={isSubmitting}>Sign In</Button>
      <p className="text-center text-sm text-text-secondary mt-4">
        Don't have an account? <Link to="/register" className="text-primary hover:underline">Sign up</Link>
      </p>
    </form>
  );
}