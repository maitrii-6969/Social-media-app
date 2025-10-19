import React, { useState, useRef, useEffect } from 'react';
import { Conversation, User } from '../types';
import { SendIcon } from './Icons';

interface ChatWindowProps {
  conversation: Conversation;
  onSendMessage: (conversationId: string, text: string) => void;
  currentUser: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, onSendMessage, currentUser }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(conversation.id, message);
      setMessage('');
    }
  };

  return (
    <>
      <div className="p-4 bg-secondary border-b border-accent flex items-center gap-4">
        <img src={conversation.user.avatar} alt={conversation.user.name} className="w-12 h-12 rounded-full" />
        <h2 className="text-xl font-bold">{conversation.user.name}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {conversation.messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.userId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-3 rounded-lg ${msg.userId === currentUser.id ? 'bg-highlight text-white' : 'bg-secondary'}`}>
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.userId === currentUser.id ? 'text-gray-200' : 'text-gray-400'}`}>{msg.timestamp}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 bg-secondary border-t border-accent">
        <form onSubmit={handleSend} className="flex items-center gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-accent p-3 rounded-full text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-highlight"
          />
          <button type="submit" className="bg-highlight p-3 rounded-full text-white hover:bg-opacity-80 transition-colors duration-200">
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatWindow;