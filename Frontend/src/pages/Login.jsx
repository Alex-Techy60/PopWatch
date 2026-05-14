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
      toast.success("Welcome back to PopWatch!");
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-text-primary">Welcome back</h2>
        <p className="text-text-secondary">Please enter your details to sign in.</p>
      </div>
      
      <div className="space-y-4">
        <Input placeholder="Email or Username" {...register('identifier')} error={errors.identifier} />
        
        <div className="space-y-2">
          <Input type="password" placeholder="Password" {...register('password')} error={errors.password} />
          <div className="flex justify-end">
            {/* Forgot Password Link Added Here */}
            <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-hover hover:underline transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full py-3 text-base shadow-lg shadow-primary/20 mt-2" isLoading={isSubmitting}>
        Sign In
      </Button>
      
      <p className="text-center text-sm text-text-secondary mt-8">
        Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Sign up for free</Link>
      </p>
    </form>
  );
}