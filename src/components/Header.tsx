import React from 'react';
import { Shield, RefreshCw } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';

const Header: React.FC = () => {
  const { clearChat } = useChat();

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 py-3 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center justify-center bg-blue-100 w-10 h-10 rounded-full mr-3">
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
          <h1 className="text-xl font-medium text-gray-900">TravelSafe AI</h1>
        </div>
        
        <button 
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          onClick={clearChat}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          <span>New Chat</span>
        </button>
      </div>
    </header>
  );
};

export default Header;