import React, { useState, useCallback, useMemo } from 'react';
import { Post, Conversation, User, Comment as CommentType, ChatMessage, Notification } from './types';
import { initialPosts, initialConversations, currentUserInitial, botUser, initialUsers, initialNotifications } from './data/mockData';
import { HomeIcon, ChatIcon, SparklesIcon, UserIcon, BellIcon, SettingsIcon } from './components/Icons';
import Feed from './components/Feed';
import ChatPage from './components/ChatPage';
import UserProfile from './components/UserProfile';
import SettingsPage from './components/SettingsPage';
import NotificationsPage from './components/NotificationsPage';

type View = 'feed' | 'chat' | 'profile' | 'settings' | 'notifications';

const App: React.FC = () => {
  const [view, setView] = useState<View>('feed');
  const [profileUserId, setProfileUserId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const currentUser = users.find(u => u.id === currentUserInitial.id)!;
  const unreadNotificationsCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const addNotification = useCallback((text: string) => {
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      text,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const handleNavigate = useCallback((newView: View, userId?: string) => {
    setView(newView);
    if (userId) {
      setProfileUserId(userId);
    }
    if (newView === 'notifications') {
        setNotifications(prev => prev.map(n => ({...n, read: true})));
    }
  }, []);

  const handleAddPost = useCallback((text: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      text,
      user: currentUser,
      likes: 0,
      likedByUser: false,
      comments: [],
      timestamp: 'Just now',
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, [currentUser]);
  
  const handleLikePost = useCallback((postId: string) => {
    let likedPost: Post | undefined;
    setPosts(posts => posts.map(p => {
      if (p.id === postId) {
        likedPost = p;
        return { ...p, likedByUser: !p.likedByUser, likes: p.likedByUser ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
    
    if (likedPost && !likedPost.likedByUser && likedPost.user.id !== currentUser.id) {
        addNotification(`${currentUser.name} liked your post.`);
    }
  }, [addNotification, currentUser]);

  const handleAddComment = useCallback((postId: string, text: string) => {
    let commentedPost: Post | undefined;
    const newComment: CommentType = {
      id: `comment-${Date.now()}`,
      text,
      user: currentUser,
      timestamp: 'Just now',
    };
    setPosts(posts => posts.map(p => {
      if (p.id === postId) {
        commentedPost = p;
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));

    if (commentedPost && commentedPost.user.id !== currentUser.id) {
        addNotification(`${currentUser.name} commented on your post: "${text}"`);
    }
  }, [addNotification, currentUser]);
  
  const handleSendMessage = useCallback((conversationId: string, text: string) => {
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        text,
        userId: currentUser.id,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setConversations(prev => prev.map(convo => {
          if (convo.id === conversationId) {
              return { ...convo, messages: [...convo.messages, newMessage] };
          }
          return convo;
      }));

      // Simulate real-time reply
      if (conversationId !== 'bot') {
        setTimeout(() => {
            const replyMessage: ChatMessage = {
                id: `msg-${Date.now()+1}`,
                text: `This is an auto-reply to "${text}"!`,
                userId: conversationId,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setConversations(prev => prev.map(convo => {
                if (convo.id === conversationId) {
                    return { ...convo, messages: [...convo.messages, replyMessage] };
                }
                return convo;
            }));
        }, 1500);
      }
  }, [currentUser]);

  const handleFollowToggle = useCallback((userIdToToggle: string) => {
    if (userIdToToggle === currentUser.id) return;
    
    let targetUser: User | undefined;
    setUsers(prevUsers => prevUsers.map(user => {
        if (user.id === userIdToToggle) {
            targetUser = user;
            return { ...user, isFollowing: !user.isFollowing, followers: user.isFollowing ? user.followers - 1 : user.followers + 1 };
        }
        if (user.id === currentUser.id) {
            return { ...user, following: prevUsers.find(u => u.id === userIdToToggle)!.isFollowing ? user.following - 1 : user.following + 1 };
        }
        return user;
    }));

    if (targetUser && !targetUser.isFollowing) {
        addNotification(`You started following ${targetUser.name}.`);
    }
  }, [currentUser, addNotification]);

  const NavButton = ({ targetView, icon, label, notificationCount }: { targetView: View, icon: React.ReactNode, label: string, notificationCount?: number }) => (
    <button
      onClick={() => handleNavigate(targetView, targetView === 'profile' ? currentUser.id : undefined)}
      className={`flex items-center gap-4 text-xl p-3 rounded-lg w-full transition-colors duration-200 relative ${view === targetView ? 'bg-highlight text-white' : 'text-light hover:bg-accent'}`}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
      {notificationCount && notificationCount > 0 && (
        <span className="absolute top-1 left-9 lg:left-auto lg:right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {notificationCount}
        </span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-primary flex">
      <nav className="w-20 lg:w-64 bg-secondary p-4 flex flex-col items-center lg:items-start border-r border-accent">
        <div className="text-highlight text-2xl font-bold mb-12 flex items-center gap-2">
            <SparklesIcon className="w-8 h-8"/>
            <span className="hidden lg:inline">Sphere</span>
        </div>
        <ul className="space-y-4">
          <li><NavButton targetView="feed" icon={<HomeIcon className="w-7 h-7"/>} label="Feed" /></li>
          <li><NavButton targetView="chat" icon={<ChatIcon className="w-7 h-7"/>} label="Messages" /></li>
          <li><NavButton targetView="notifications" icon={<BellIcon className="w-7 h-7"/>} label="Notifications" notificationCount={unreadNotificationsCount} /></li>
          <li><NavButton targetView="profile" icon={<UserIcon className="w-7 h-7"/>} label="Profile" /></li>
          <li><NavButton targetView="settings" icon={<SettingsIcon className="w-7 h-7"/>} label="Settings" /></li>
        </ul>
        <div className="mt-auto flex items-center gap-3 p-2">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-12 h-12 rounded-full border-2 border-highlight" />
            <div className="hidden lg:flex flex-col">
                <span className="font-semibold">{currentUser.name}</span>
                <span className="text-sm text-gray-400">Online</span>
            </div>
        </div>
      </nav>
      
      <main className="flex-1 overflow-y-auto">
        {view === 'feed' && (
          <Feed 
            posts={posts} 
            onAddPost={handleAddPost} 
            onLikePost={handleLikePost} 
            onAddComment={handleAddComment} 
            onNavigateToProfile={(userId) => handleNavigate('profile', userId)}
            currentUser={currentUser}
          />
        )}
        {view === 'chat' && (
          <ChatPage 
            conversations={conversations}
            onSendMessage={handleSendMessage}
            setConversations={setConversations}
            currentUser={currentUser}
          />
        )}
        {view === 'profile' && profileUserId && (
            <UserProfile
                userId={profileUserId}
                currentUser={currentUser}
                users={users}
                posts={posts}
                onFollowToggle={handleFollowToggle}
                onNavigateToProfile={(userId) => handleNavigate('profile', userId)}
            />
        )}
        {view === 'settings' && <SettingsPage />}
        {view === 'notifications' && <NotificationsPage notifications={notifications} />}
      </main>
    </div>
  );
};

export default App;