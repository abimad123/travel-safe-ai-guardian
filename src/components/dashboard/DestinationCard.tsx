
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface Destination {
  id: string;
  name: string;
  image: string;
  safetyScore: number;
  description: string;
}

interface DestinationCardProps {
  destination: Destination;
  searchQuery?: string; // Added searchQuery as an optional prop
}

const DestinationCard = ({ destination, searchQuery }: DestinationCardProps) => {
  const navigate = useNavigate();

  const getSafetyColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{destination.name}</h3>
          <div className={`font-bold ${getSafetyColor(destination.safetyScore)}`}>
            {destination.safetyScore}/10
          </div>
        </div>
        <p className="text-gray-600 line-clamp-3">{destination.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button 
          onClick={() => navigate(`/destination/${destination.id}`)}
          className="w-full"
        >
          Explore
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
