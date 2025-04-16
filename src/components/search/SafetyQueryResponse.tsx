
import React from "react";
import { Shield, AlertTriangle, Check, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Destination } from "@/components/dashboard/DestinationCard";

interface SafetyQueryResponseProps {
  destination: Destination;
  query: string;
}

const SafetyQueryResponse: React.FC<SafetyQueryResponseProps> = ({ destination, query }) => {
  // Detect if query contains safety-related keywords
  const isSafetyQuery = /\b(safe|safety|danger|dangerous|risk|crime|secure)\b/i.test(query);
  
  // Determine location name from query (simplified method)
  const locationRegex = new RegExp(`\\b(${destination.name.split(',')[0]})\\b`, 'i');
  const mentionsLocation = locationRegex.test(query);
  
  // Check if it's asking about whether to go/visit
  const isVisitQuery = /\b(go|visit|travel|trip to)\b/i.test(query);
  
  if (!isSafetyQuery && !isVisitQuery) {
    return null;
  }

  // Generate appropriate response based on safety score
  const getSafetyResponse = () => {
    const locationName = destination.name.split(',')[0];
    
    if (destination.safetyScore >= 8.5) {
      return (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <Check className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-semibold">{locationName}</span> is considered a very safe destination with a safety score of <span className="font-semibold text-green-600">{destination.safetyScore}/10</span>. 
              Travelers generally experience few safety concerns here, though standard travel precautions are always recommended.
            </p>
          </div>
        </div>
      );
    } else if (destination.safetyScore >= 7) {
      return (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <Shield className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-semibold">{locationName}</span> is generally considered safe for travelers with a safety score of <span className="font-semibold text-blue-600">{destination.safetyScore}/10</span>. 
              Take normal precautions, stay alert in crowded areas, and keep track of your belongings. Most visitors experience no safety issues.
            </p>
          </div>
        </div>
      );
    } else if (destination.safetyScore >= 6) {
      return (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <Info className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-semibold">{locationName}</span> has a moderate safety score of <span className="font-semibold text-yellow-600">{destination.safetyScore}/10</span>. 
              While many areas are safe for tourists, increased caution is advised. Research specific neighborhoods before visiting, avoid isolated areas at night, and stay alert.
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-semibold">{locationName}</span> has a safety score of <span className="font-semibold text-orange-600">{destination.safetyScore}/10</span>, 
              indicating some safety concerns. If you plan to visit, exercise high caution, thoroughly research safe areas, avoid high-risk zones, 
              and consider consulting travel advisories beforehand.
            </p>
          </div>
        </div>
      );
    }
  };

  const getVisitRecommendation = () => {
    const locationName = destination.name.split(',')[0];
    
    if (destination.safetyScore >= 8) {
      return (
        <p className="mt-2 text-gray-700">
          <span className="font-semibold text-green-600">Recommendation:</span> {locationName} is an excellent choice for travelers of all types, including solo travelers, families, and first-time visitors.
        </p>
      );
    } else if (destination.safetyScore >= 7) {
      return (
        <p className="mt-2 text-gray-700">
          <span className="font-semibold text-blue-600">Recommendation:</span> {locationName} is a good destination choice with reasonable safety levels. Suitable for most travelers who take standard precautions.
        </p>
      );
    } else if (destination.safetyScore >= 6) {
      return (
        <p className="mt-2 text-gray-700">
          <span className="font-semibold text-yellow-600">Recommendation:</span> {locationName} can be visited safely with proper preparation and awareness. Experienced travelers should have no issues, but first-time travelers may want to research thoroughly before deciding.
        </p>
      );
    } else {
      return (
        <p className="mt-2 text-gray-700">
          <span className="font-semibold text-orange-600">Recommendation:</span> For {locationName}, consider whether your travel experience and comfort level with higher-risk destinations aligns with the current safety situation. Many travelers may want to consider other destinations.
        </p>
      );
    }
  };

  return (
    <Card className="mb-6 border-l-4 border-blue-400">
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold mb-3">Safety Information</h3>
        {getSafetyResponse()}
        {isVisitQuery && getVisitRecommendation()}
        <p className="mt-3 text-sm text-gray-500">
          Safety scores are based on combined factors including crime rates, health risks, and environmental conditions. 
          Always check current travel advisories before planning your trip.
        </p>
      </CardContent>
    </Card>
  );
};

export default SafetyQueryResponse;
