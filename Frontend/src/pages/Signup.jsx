import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { registerUser } from "../api/authApi";

function Signup() {

    const navigate = useNavigate();

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });

    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (
            !formData.fullName ||
            !formData.username ||
            !formData.email ||
            !formData.password
        ) {
            setError("All fields are required");
            return;
        }

        if (!avatar) {
            setError("Avatar is required");
            return;
        }

        try {

            setLoading(true);

            const data = new FormData();

            data.append("fullName", formData.fullName);
            data.append("username", formData.username);
            data.append("email", formData.email);
            data.append("password", formData.password);

            data.append("avatar", avatar);

            if (coverImage) {
                data.append("coverImage", coverImage);
            }

            await registerUser(data);

            navigate("/login");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Signup failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-5 py-10">

            <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

                <h1 className="text-4xl font-black text-center mb-2">
                    Create Account
                </h1>

                <p className="text-zinc-400 text-center mb-8">
                    Join PopWatch today
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <Input
                        placeholder="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />

                    <Input
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />

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

                    <div>

                        <p className="mb-2 text-sm text-zinc-400">
                            Avatar
                        </p>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setAvatar(e.target.files[0])
                            }
                            className="w-full text-sm text-zinc-300"
                        />

                    </div>

                    <div>

                        <p className="mb-2 text-sm text-zinc-400">
                            Cover Image
                        </p>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setCoverImage(e.target.files[0])
                            }
                            className="w-full text-sm text-zinc-300"
                        />

                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Creating Account..."
                                : "Create Account"
                        }
                    </Button>

                </form>

                <p className="text-center text-zinc-400 mt-6">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-red-500 hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Signup;