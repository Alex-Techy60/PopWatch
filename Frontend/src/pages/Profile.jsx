// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/c/${username}`);
        setProfile(response.data.data);
      } catch (error) {
        console.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  if (loading) return <div className="text-primary p-6 animate-pulse">Loading Profile...</div>;
  if (!profile) return <div className="text-red-400 p-6">Channel not found.</div>;

  const isOwner = currentUser?.username === profile.username;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Cover Image */}
      <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden bg-surface relative">
        {profile.coverImage ? (
          <img src={profile.coverImage} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary/40 to-surface"></div>
        )}
      </div>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 px-6 -mt-12 relative z-10">
        <img 
          src={profile.avatar} 
          alt={profile.fullName} 
          className="w-32 h-32 rounded-full border-4 border-background object-cover bg-surface"
        />
        <div className="flex-1 mt-14 text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-start">
          <div>
            <h1 className="text-3xl font-bold text-textMain">{profile.fullName}</h1>
            <p className="text-textMuted font-medium mt-1">@{profile.username}</p>
            <p className="text-textMuted text-sm mt-2">
              <span className="text-textMain font-semibold">{profile.subscribersCount}</span> subscribers • {" "}
              <span className="text-textMain font-semibold">{profile.channelsSubscribedToCount}</span> subscribed
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            {isOwner ? (
              <button className="px-6 py-2 bg-surface border border-primary/30 text-textMain rounded-full font-semibold hover:bg-primary/10 transition-colors">
                Customize Channel
              </button>
            ) : (
              <button className={`px-6 py-2 rounded-full font-semibold transition-colors ${profile.isSubscribed ? 'bg-surface text-textMain border border-primary/20' : 'bg-textMain text-background hover:bg-gray-200'}`}>
                {profile.isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-primary/10 mt-8 mb-6"></div>
      
      {/* Videos Section */}
      <h3 className="text-xl font-bold text-textMain px-6">Videos</h3>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-textMuted text-sm">No videos uploaded yet.</div>
      </div>
    </div>
  );
};

export default Profile;