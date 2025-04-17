
import React from "react";
import DestinationCard, { Destination } from "@/components/dashboard/DestinationCard";

interface DestinationResultsProps {
  results: Destination[];
  query: string;
  handleCardClick: (destination: Destination) => void;
}

const DestinationResults: React.FC<DestinationResultsProps> = ({ 
  results, 
  query,
  handleCardClick 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((destination) => (
        <div key={destination.id} onClick={() => handleCardClick(destination)} className="cursor-pointer">
          <DestinationCard 
            destination={destination} 
            searchQuery={query}
          />
        </div>
      ))}
    </div>
  );
};

export default DestinationResults;
