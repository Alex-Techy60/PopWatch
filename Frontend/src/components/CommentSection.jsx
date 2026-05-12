// src/components/CommentSection.jsx
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import Avatar from './ui/Avatar';
import Button from './ui/Button';

export default function CommentSection({ videoId, comments = [] }) {
  const { isAuthenticated, user } = useAuth();
  const [text, setText] = useState('');

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">{comments.length} Comments</h3>
      
      {!isAuthenticated ? (
        <div className="bg-surface-elevated p-4 rounded-lg text-center border border-border">
          <p className="text-text-secondary mb-2">Sign in to add a comment</p>
        </div>
      ) : (
        <div className="flex gap-4 mb-8">
          <Avatar src={user?.avatar} size="md" />
          <div className="flex-1 flex flex-col items-end gap-2">
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full bg-transparent border-b border-border focus:border-primary focus:outline-none resize-none py-1 text-sm transition-colors"
              rows={1}
            />
            {text && <Button variant="primary" size="sm">Post</Button>}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {comments.map(c => (
          <div key={c._id} className="flex gap-3">
            <Avatar src={c.owner.avatar} size="md" />
            <div>
              <p className="text-sm font-medium">@{c.owner.username} <span className="text-text-secondary text-xs font-normal">ago</span></p>
              <p className="text-sm mt-1">{c.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}