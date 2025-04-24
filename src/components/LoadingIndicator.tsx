import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex max-w-[85%] md:max-w-[75%] flex-row">
        <div className="flex-shrink-0 mr-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <div className="h-4 w-4 text-blue-600 animate-pulse">•••</div>
          </div>
        </div>
        
        <div className="rounded-2xl px-4 py-3 bg-white text-gray-800 shadow-sm border border-gray-100">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;