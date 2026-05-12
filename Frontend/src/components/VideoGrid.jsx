// src/components/VideoGrid.jsx
import SkeletonCard from './ui/SkeletonCard';
import VideoCard from './VideoCard';

export default function VideoGrid({ videos = [], isLoading }) {
  if (isLoading && videos.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {videos.map(video => <VideoCard key={video._id} video={video} />)}
    </div>
  );
}