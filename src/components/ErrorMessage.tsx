import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="rounded-lg bg-red-50 p-4 mb-4 mx-auto max-w-4xl">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
            {message.includes('API key') && (
              <p className="mt-2">
                Please set your Gemini API key in the .env file as VITE_GEMINI_API_KEY.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;