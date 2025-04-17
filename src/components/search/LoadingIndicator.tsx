
import React from "react";

interface LoadingIndicatorProps {
  message?: string;
  subMessage?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = "Searching destinations...",
  subMessage = "We're gathering the latest information for you."
}) => {
  return (
    <div className="text-center py-12">
      <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
      <p className="mt-3 text-gray-600 text-lg">{message}</p>
      <p className="text-sm text-gray-500">{subMessage}</p>
    </div>
  );
};

export default LoadingIndicator;
