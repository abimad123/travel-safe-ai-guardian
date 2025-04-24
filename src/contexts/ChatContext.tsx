import React, { createContext, useState, useContext, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatContextType } from '../types';
import { generateResponse } from '../services/geminiService';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: "Hello! I'm TravelSafe AI, your travel safety assistant. Ask me any questions about staying safe while traveling, and I'll provide helpful information and tips!",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await generateResponse(content);
      
      // Add AI response
      const aiMessage: Message = {
        id: uuidv4(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching the response');
      console.error('Error in sendMessage:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: uuidv4(),
        content: "Hello! I'm TravelSafe AI, your travel safety assistant. Ask me any questions about staying safe while traveling, and I'll provide helpful information and tips!",
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
    setError(null);
  };

  return (
    <ChatContext.Provider value={{ messages, isLoading, error, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};