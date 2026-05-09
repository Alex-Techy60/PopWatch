import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../features/auth/authSlice";
import { logoutUser } from "../../api/authApi";

function Navbar() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await logoutUser();
            dispatch(logoutSuccess());
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="bg-zinc-950 border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
            <Link to="/" className="text-3xl font-bold text-red-500">
                PopWatch
            </Link>

            <div className="flex items-center gap-6">
                {isAuthenticated ? (
                    <>
                        <p className="font-medium">
                            {user?.fullName}
                        </p>

                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;