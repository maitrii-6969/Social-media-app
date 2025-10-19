import React from 'react';
import { Notification } from '../types';
import { HeartIcon, CommentIcon, UserIcon } from './Icons';

interface NotificationsPageProps {
  notifications: Notification[];
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const getIcon = () => {
    const text = notification.text.toLowerCase();
    if (text.includes('liked')) return <HeartIcon className="w-6 h-6 text-highlight" />;
    if (text.includes('commented')) return <CommentIcon className="w-6 h-6 text-blue-400" />;
    if (text.includes('followed')) return <UserIcon className="w-6 h-6 text-green-400" />;
    return null;
  };

  return (
    <div className={`flex items-start gap-4 p-4 border-b border-accent ${!notification.read ? 'bg-accent' : ''}`}>
      <div className="flex-shrink-0 mt-1">{getIcon()}</div>
      <div className="flex-1">
        <p className="text-light">{notification.text}</p>
        <p className="text-sm text-gray-400 mt-1">{notification.timestamp}</p>
      </div>
      {!notification.read && <div className="w-3 h-3 bg-highlight rounded-full self-center"></div>}
    </div>
  );
};

const NotificationsPage: React.FC<NotificationsPageProps> = ({ notifications }) => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-highlight mb-6">Notifications</h1>
      <div className="bg-secondary rounded-lg shadow-lg overflow-hidden">
        {notifications.length > 0 ? (
          notifications.map(notif => <NotificationItem key={notif.id} notification={notif} />)
        ) : (
          <p className="p-8 text-center text-gray-400">You have no new notifications.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;