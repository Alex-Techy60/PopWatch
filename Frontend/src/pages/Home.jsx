import { useSelector } from "react-redux";

function Home() {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    return (
        <div className="min-h-screen bg-black text-white px-5 py-10">
            <div className="max-w-6xl mx-auto">

                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12">

                    <h1 className="text-5xl md:text-6xl font-black leading-tight">
                        Welcome to{" "}
                        <span className="text-red-500">
                            PopWatch
                        </span>
                    </h1>

                    <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-3xl">
                        Build your audience, upload content, create playlists,
                        go live, interact with communities and create the next
                        generation creator platform.
                    </p>

                    {isAuthenticated && user ? (
                        <div className="mt-12 flex items-center gap-5">

                            <img
                                src={user.avatar}
                                alt={user.username}
                                className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700"
                            />

                            <div>
                                <h2 className="text-2xl font-bold">
                                    {user.fullName}
                                </h2>

                                <p className="text-zinc-400">
                                    @{user.username}
                                </p>
                            </div>

                        </div>
                    ) : (
                        <div className="mt-10">
                            <p className="text-lg text-zinc-300">
                                Create an account to continue.
                            </p>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}

export default Home;