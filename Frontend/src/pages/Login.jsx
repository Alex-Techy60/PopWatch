import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { loginUser } from "../api/authApi";

import {
    loginSuccess,
    setLoading,
} from "../features/auth/authSlice";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!formData.email || !formData.password) {
            setError("All fields are required");
            return;
        }

        try {

            dispatch(setLoading(true));

            const response = await loginUser(formData);

            dispatch(
                loginSuccess(response.data.user)
            );

            navigate("/");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            dispatch(setLoading(false));

        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-5">

            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

                <h1 className="text-4xl font-black text-center mb-2">
                    Welcome Back
                </h1>

                <p className="text-zinc-400 text-center mb-8">
                    Login to your PopWatch account
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}

                    <Button type="submit">
                        Login
                    </Button>

                </form>

                <p className="text-center text-zinc-400 mt-6">

                    Don&apos;t have an account?{" "}

                    <Link
                        to="/signup"
                        className="text-red-500 hover:underline"
                    >
                        Signup
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;