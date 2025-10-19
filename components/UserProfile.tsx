import React from 'react';
import { User, Post } from '../types';
import PostCard from './PostCard'; // Re-using PostCard might be complex depending on props. Let's assume it works.

interface UserProfileProps {
  userId: string;
  currentUser: User;
  users: User[];
  posts: Post[];
  onFollowToggle: (userId: string) => void;
  onNavigateToProfile: (userId: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, currentUser, users, posts, onFollowToggle, onNavigateToProfile }) => {
  const user = users.find(u => u.id === userId);
  const userPosts = posts.filter(p => p.user.id === userId);

  if (!user) {
    return <div className="p-8 text-center text-xl">User not found.</div>;
  }

  const isCurrentUserProfile = user.id === currentUser.id;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-light">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6 bg-secondary rounded-lg">
        <img src={user.avatar} alt={user.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-highlight shadow-lg" />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <div className="flex justify-center md:justify-start gap-6 my-4 text-lg">
            <div><span className="font-bold">{userPosts.length}</span> Posts</div>
            <div><span className="font-bold">{user.followers}</span> Followers</div>
            <div><span className="font-bold">{user.following}</span> Following</div>
          </div>
          <p className="text-gray-300 mb-4">{user.bio}</p>
          {!isCurrentUserProfile && (
            <button
              onClick={() => onFollowToggle(user.id)}
              className={`px-6 py-2 rounded-full font-bold transition-colors duration-200 ${user.isFollowing ? 'bg-accent text-light hover:bg-opacity-80' : 'bg-highlight text-white hover:bg-opacity-80'}`}
            >
              {user.isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-highlight mb-4 border-b-2 border-accent pb-2">Posts</h2>
        <div className="space-y-6">
          {userPosts.length > 0 ? (
            userPosts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                // Dummy handlers for like/comment as profile is read-only for now
                onLike={() => {}} 
                onAddComment={() => {}} 
                onNavigateToProfile={onNavigateToProfile}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">This user hasn't posted anything yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;