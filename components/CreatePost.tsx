import React, { useState } from 'react';
import { User } from '../types';

interface CreatePostProps {
  onAddPost: (text: string) => void;
  currentUser: User;
}

const CreatePost: React.FC<CreatePostProps> = ({ onAddPost, currentUser }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddPost(text);
      setText('');
    }
  };

  return (
    <div className="bg-secondary p-4 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex items-start gap-4">
        <img src={currentUser.avatar} alt="current user" className="w-12 h-12 rounded-full" />
        <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-accent p-3 rounded-lg text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-highlight"
              rows={3}
            />
            <div className="flex justify-end mt-2">
                <button
                type="submit"
                className="bg-highlight text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-80 transition-colors duration-200 disabled:bg-gray-500"
                disabled={!text.trim()}
                >
                Post
                </button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;