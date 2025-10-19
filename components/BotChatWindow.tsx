import React, { useState, useRef, useEffect, useCallback } from 'react';
import { User, ChatMessage } from '../types';
import { SendIcon, SparklesIcon } from './Icons';
import { startChat } from '../services/geminiService';
import type { Chat } from '@google/genai';

interface BotChatWindowProps {
  user: User;
  currentUser: User;
}

const BotChatWindow: React.FC<BotChatWindowProps> = ({ user, currentUser }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current = startChat();
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatRef.current || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text: input,
      userId: currentUser.id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botMessageId = `msg-${Date.now() + 1}`;
    const botMessagePlaceholder: ChatMessage = {
      id: botMessageId,
      text: '',
      userId: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, botMessagePlaceholder]);
    
    try {
        const stream = await chatRef.current.sendMessageStream({ message: input });
        let text = '';
        for await (const chunk of stream) {
            text += chunk.text;
            setMessages(prev => prev.map(msg => msg.id === botMessageId ? {...msg, text} : msg));
        }
    } catch (error) {
        console.error("Gemini API error:", error);
        setMessages(prev => prev.map(msg => msg.id === botMessageId ? {...msg, text: 'Sorry, something went wrong.'} : msg));
    } finally {
        setIsLoading(false);
    }
  }, [input, isLoading, currentUser]);

  return (
    <>
      <div className="p-4 bg-secondary border-b border-accent flex items-center gap-4">
        <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
            <SparklesIcon className="absolute bottom-0 right-0 w-5 h-5 text-yellow-400 bg-secondary rounded-full p-0.5"/>
        </div>
        <h2 className="text-xl font-bold">{user.name}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={msg.id} className={`flex ${msg.userId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-3 rounded-lg ${msg.userId === currentUser.id ? 'bg-highlight text-white' : 'bg-secondary'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {isLoading && msg.userId === 'bot' && index === messages.length -1 && (
                    <div className="w-2 h-2 bg-highlight rounded-full animate-pulse-fast mt-2"></div>
                )}
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gemini anything..."
            disabled={isLoading}
            className="flex-1 bg-accent p-3 rounded-full text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-highlight disabled:opacity-50"
          />
          <button type="submit" className="bg-highlight p-3 rounded-full text-white hover:bg-opacity-80 transition-colors duration-200 disabled:bg-gray-500" disabled={isLoading || !input.trim()}>
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </>
  );
};

export default BotChatWindow;