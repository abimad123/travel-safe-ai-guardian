
import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
      <p className="mt-2 text-gray-600">Searching destinations...</p>
    </div>
  );
};

export default LoadingIndicator;
