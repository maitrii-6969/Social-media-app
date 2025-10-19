import React, { useState, useMemo } from 'react';
import { Conversation, User } from '../types';
import { botUser } from '../data/mockData';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import BotChatWindow from './BotChatWindow';

interface ChatPageProps {
  conversations: Conversation[];
  onSendMessage: (conversationId: string, text: string) => void;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  currentUser: User;
}

const ChatPage: React.FC<ChatPageProps> = ({ conversations, onSendMessage, setConversations, currentUser }) => {
  const [selectedConvoId, setSelectedConvoId] = useState<string | null>('bot');
  
  const allConversations = useMemo(() => [
    { id: 'bot', user: botUser, messages: [] }, 
    ...conversations
  ], [conversations]);

  const selectedConversation = useMemo(() => {
    return allConversations.find(c => c.id === selectedConvoId) || null;
  }, [selectedConvoId, allConversations]);
  
  return (
    <div className="flex h-screen">
      <ChatList 
        conversations={allConversations}
        selectedConversationId={selectedConvoId}
        onSelectConversation={setSelectedConvoId}
      />
      <div className="flex-1 flex flex-col bg-primary">
        {selectedConvoId === 'bot' ? (
          <BotChatWindow user={botUser} currentUser={currentUser}/>
        ) : selectedConversation ? (
          <ChatWindow
            key={selectedConversation.id}
            conversation={selectedConversation}
            onSendMessage={onSendMessage}
            currentUser={currentUser}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;