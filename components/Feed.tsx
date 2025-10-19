import React from 'react';
import { Post, User } from '../types';
import PostCard from './PostCard';
import CreatePost from './CreatePost';

interface FeedProps {
  posts: Post[];
  onAddPost: (text: string) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onNavigateToProfile: (userId: string) => void;
  currentUser: User;
}

const Feed: React.FC<FeedProps> = ({ posts, onAddPost, onLikePost, onAddComment, onNavigateToProfile, currentUser }) => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-highlight mb-6">Home Feed</h1>
      <CreatePost onAddPost={onAddPost} currentUser={currentUser} />
      <div className="space-y-6 mt-8">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLike={onLikePost} 
            onAddComment={onAddComment}
            onNavigateToProfile={onNavigateToProfile}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;