
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

interface NoResultsProps {
  query: string;
  message?: string;
  submessage?: string;
}

const NoResults: React.FC<NoResultsProps> = ({ 
  query, 
  message = `No destinations found matching "${query}"`,
  submessage = "Try searching for a different destination or check your spelling."
}) => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <SearchX className="h-16 w-16 text-gray-400" />
      </div>
      <p className="text-xl text-gray-600 mb-2">{message}</p>
      <p className="text-gray-500 mb-4">{submessage}</p>
      <Button asChild className="mt-2">
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  );
};

export default NoResults;
