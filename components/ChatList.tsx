import React from 'react';
import { Conversation } from '../types';
import { SparklesIcon } from './Icons';

interface ChatListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ conversations, selectedConversationId, onSelectConversation }) => {
  return (
    <div className="w-1/3 bg-secondary border-r border-accent overflow-y-auto">
      <div className="p-4 border-b border-accent">
          <h2 className="text-xl font-bold">Messages</h2>
      </div>
      <ul>
        {conversations.map(convo => (
          <li key={convo.id}>
            <button
              onClick={() => onSelectConversation(convo.id)}
              className={`w-full text-left p-4 flex items-center gap-4 transition-colors duration-200 ${selectedConversationId === convo.id ? 'bg-accent' : 'hover:bg-accent'}`}
            >
              <div className="relative">
                <img src={convo.user.avatar} alt={convo.user.name} className="w-14 h-14 rounded-full" />
                {convo.id === 'bot' && <SparklesIcon className="absolute bottom-0 right-0 w-5 h-5 text-yellow-400 bg-secondary rounded-full p-0.5" />}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold truncate">{convo.user.name}</p>
                <p className="text-sm text-gray-400 truncate">
                  {convo.messages.length > 0 ? convo.messages[convo.messages.length - 1].text : 'Start a conversation...'}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;