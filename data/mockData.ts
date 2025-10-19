import { User, Post, Conversation, Notification } from '../types';

export const currentUserInitial: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  avatar: 'https://picsum.photos/id/1005/100/100',
  bio: 'Photographer, dreamer, and coffee enthusiast. Capturing moments one frame at a time. ☕️📸',
  followers: 1450,
  following: 210,
  isFollowing: false, // You don't follow yourself
};

export const initialUsers: User[] = [
  currentUserInitial,
  { id: 'user-2', name: 'Brianna Smith', avatar: 'https://picsum.photos/id/1011/100/100', bio: 'Fitness guru & healthy recipe creator. Join me on my journey to a healthier lifestyle! 💪🥗', followers: 2345, following: 320, isFollowing: true },
  { id: 'user-3', name: 'Charles Brown', avatar: 'https://picsum.photos/id/1025/100/100', bio: 'Musician and songwriter. Just a guy with a guitar and a story to tell. 🎸🎶', followers: 890, following: 150, isFollowing: false },
  { id: 'user-4', name: 'Diana Miller', avatar: 'https://picsum.photos/id/1027/100/100', bio: 'Digital artist and illustrator. Bringing imaginary worlds to life with color and code. 🎨✨', followers: 5600, following: 85, isFollowing: true },
];

export const botUser: User = {
    id: 'bot',
    name: 'Gemini Assistant',
    avatar: 'https://i.imgur.com/2J6sT5H.png',
    bio: 'I am a friendly AI assistant here to help you navigate Social Sphere. Ask me anything!',
    followers: 0,
    following: 0,
    isFollowing: false,
};

export const initialPosts: Post[] = [
  {
    id: 'post-1',
    text: 'Just finished a 10-mile hike! The views were absolutely breathtaking. Feeling so refreshed and accomplished. 🏞️ #hiking #nature #adventure',
    user: initialUsers[1],
    likes: 128,
    likedByUser: false,
    comments: [
      { id: 'comment-1', text: 'Wow, that sounds amazing!', user: initialUsers[2], timestamp: '2 hours ago' },
      { id: 'comment-2', text: 'Where was this? I need to go!', user: initialUsers[3], timestamp: '1 hour ago' },
    ],
    timestamp: '3 hours ago',
  },
  {
    id: 'post-2',
    text: 'My new creative workspace is finally set up! Ready to dive into some exciting new projects. What do you all think? ✨ #design #workspace #creativity',
    user: initialUsers[3],
    likes: 256,
    likedByUser: true,
    comments: [
      { id: 'comment-3', text: 'Looks so clean and inspiring!', user: initialUsers[1], timestamp: '5 hours ago' },
    ],
    timestamp: '6 hours ago',
  },
  {
    id: 'post-3',
    text: 'Experimenting with some new recipes in the kitchen today. This sourdough came out perfectly! 🍞 #baking #sourdough #foodie',
    user: currentUserInitial,
    likes: 98,
    likedByUser: false,
    comments: [],
    timestamp: '1 day ago',
  },
   {
    id: 'post-4',
    text: 'A quick sketch from this morning\'s session. Trying out a new style. #art #illustration #procreate',
    user: initialUsers[3],
    likes: 412,
    likedByUser: false,
    comments: [
        { id: 'comment-4', text: 'Love this style!', user: currentUserInitial, timestamp: '4 hours ago' },
    ],
    timestamp: '8 hours ago',
  },
];

export const initialConversations: Conversation[] = [
  {
    id: 'user-2',
    user: initialUsers[1],
    messages: [
      { id: 'msg-1', text: 'Hey, did you see that new design post?', userId: 'user-2', timestamp: '10:00 AM' },
      { id: 'msg-2', text: 'Yeah, it was awesome! So inspiring.', userId: 'user-1', timestamp: '10:01 AM' },
    ],
  },
  {
    id: 'user-3',
    user: initialUsers[2],
    messages: [
       { id: 'msg-3', text: 'Are we still on for the hike this weekend?', userId: 'user-3', timestamp: 'Yesterday' },
    ]
  },
];


export const initialNotifications: Notification[] = [
    { id: 'notif-1', text: 'Diana Miller followed you.', timestamp: '2 hours ago', read: false },
    { id: 'notif-2', text: 'Charles Brown liked your post about sourdough.', timestamp: '5 hours ago', read: false },
    { id: 'notif-3', text: 'Brianna Smith commented on your post: "Looks so clean and inspiring!"', timestamp: '1 day ago', read: true },
];