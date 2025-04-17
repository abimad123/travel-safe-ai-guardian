
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

interface NoResultsProps {
  query: string;
}

const NoResults: React.FC<NoResultsProps> = ({ query }) => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <SearchX className="h-16 w-16 text-gray-400" />
      </div>
      <p className="text-xl text-gray-600 mb-2">No destinations found matching "{query}"</p>
      <p className="text-gray-500 mb-4">Try searching for a different destination or check your spelling.</p>
      <Button asChild className="mt-2">
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  );
};

export default NoResults;
