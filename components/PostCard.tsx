import React, { useState } from 'react';
import { Post, Comment as CommentType } from '../types';
import { HeartIcon, CommentIcon } from './Icons';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onNavigateToProfile: (userId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onAddComment, onNavigateToProfile }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(post.id, commentText);
      setCommentText('');
    }
  };

  // FIX: Explicitly define `children` prop for `UserLink` component as it's no longer implicit in `React.FC` for React 18 types.
  const UserLink: React.FC<{user: Post['user'] | CommentType['user'], children: React.ReactNode}> = ({ user, children }) => (
      <button onClick={() => onNavigateToProfile(user.id)} className="text-left hover:opacity-80 transition-opacity">
          {children}
      </button>
  );

  return (
    <div className="bg-secondary p-5 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <UserLink user={post.user}>
            <img src={post.user.avatar} alt={post.user.name} className="w-12 h-12 rounded-full mr-4" />
        </UserLink>
        <div>
          <UserLink user={post.user}>
            <p className="font-bold text-lg">{post.user.name}</p>
          </UserLink>
          <p className="text-sm text-gray-400">{post.timestamp}</p>
        </div>
      </div>
      <p className="text-light mb-4 whitespace-pre-wrap">{post.text}</p>
      <div className="flex items-center text-gray-400 space-x-6 border-b border-t border-accent py-2">
        <button onClick={() => onLike(post.id)} className={`flex items-center space-x-2 hover:text-highlight transition-colors duration-200 ${post.likedByUser ? 'text-highlight' : ''}`}>
          <HeartIcon solid={post.likedByUser} className="w-6 h-6" />
          <span>{post.likes} Likes</span>
        </button>
        <div className="flex items-center space-x-2">
          <CommentIcon className="w-6 h-6" />
          <span>{post.comments.length} Comments</span>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {post.comments.map(comment => (
          <div key={comment.id} className="flex items-start gap-3">
            <UserLink user={comment.user}>
                <img src={comment.user.avatar} alt={comment.user.name} className="w-9 h-9 rounded-full" />
            </UserLink>
            <div className="bg-accent px-3 py-2 rounded-lg">
                <UserLink user={comment.user}>
                    <p className="font-semibold text-sm">{comment.user.name}</p>
                </UserLink>
              <p className="text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="mt-4 flex items-center gap-3">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-accent p-2 rounded-full text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-highlight"
        />
        <button type="submit" className="text-highlight font-semibold hover:underline disabled:text-gray-500" disabled={!commentText.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default PostCard;
