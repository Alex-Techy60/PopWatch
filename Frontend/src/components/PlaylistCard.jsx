// src/components/PlaylistCard.jsx
import { Link } from 'react-router-dom';
import { ListVideo } from 'lucide-react';

export default function PlaylistCard({ playlist }) {
  return (
    <Link to={`/playlists/${playlist._id}`} className="group flex flex-col gap-2">
      <div className="relative aspect-video bg-surface-elevated rounded-xl overflow-hidden">
        <img src={playlist.thumbnail || '/placeholder.jpg'} alt="" className="w-full h-full object-cover" />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-sm">
          <ListVideo size={24} />
          <span className="text-xs mt-1">{playlist.videosCount} videos</span>
        </div>
      </div>
      <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">{playlist.name}</h3>
    </Link>
  );
}