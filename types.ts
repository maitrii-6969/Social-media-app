export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  isFollowing: boolean;
}

export interface Comment {
  id: string;
  text: string;
  user: User;
  timestamp: string;
}

export interface Post {
  id: string;
  text: string;
  user: User;
  likes: number;
  likedByUser: boolean;
  comments: Comment[];
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  userId: string;
  timestamp: string;
}

export interface Conversation {
  id: string; // userId or 'bot'
  user: User;
  messages: ChatMessage[];
}

export interface Notification {
  id: string;
  text: string;
  timestamp: string;
  read: boolean;
  link?: string; // Optional link for navigation
}