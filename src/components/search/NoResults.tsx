
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NoResultsProps {
  query: string;
}

const NoResults: React.FC<NoResultsProps> = ({ query }) => {
  return (
    <div className="text-center py-12">
      <p className="text-xl text-gray-600">No destinations found matching "{query}"</p>
      <Button asChild className="mt-4">
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  );
};

export default NoResults;
