import React from 'react';
import { Message } from '../types';
import { Shield } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(message.timestamp);

  const isAi = message.sender === 'ai';

  return (
    <div
      className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-4 animate-fadeIn`}
    >
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
        {isAi && (
          <div className="flex-shrink-0 mr-2 mt-1">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Shield className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        )}
        
        <div
          className={`rounded-2xl px-4 py-3 ${
            isAi 
              ? 'bg-white text-gray-800 shadow-sm border border-gray-100' 
              : 'bg-blue-600 text-white'
          }`}
        >
          <div className="text-sm">{message.content}</div>
          <div 
            className={`text-xs mt-1 ${
              isAi ? 'text-gray-500' : 'text-blue-200'
            }`}
          >
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;