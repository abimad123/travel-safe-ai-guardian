
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Lock, AlertTriangle, Sun } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-24 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Travel Safe with TravelGuardian
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Explore destinations worldwide with confidence using real-time safety data, 
            environmental monitoring, and personalized travel recommendations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              <Link to="/trip-planner">Plan Your Trip</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/search">Explore Destinations</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Features overview */}
      <div className="container mx-auto mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <Globe className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
            <p className="text-white/80">
              Information on thousands of destinations worldwide
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <Lock className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Safety Ratings</h3>
            <p className="text-white/80">
              Up-to-date safety scores for every destination
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <AlertTriangle className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Travel Alerts</h3>
            <p className="text-white/80">
              Real-time alerts about local conditions
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <Sun className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Weather Info</h3>
            <p className="text-white/80">
              Current conditions and forecasts for your trip
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-1/3 opacity-10">
        {/* Background decorative element */}
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M45.7,-78.2C58.9,-69.2,69.3,-55.2,76.4,-40.1C83.5,-25,87.3,-8.9,85.6,6.8C83.8,22.6,76.5,38.1,65.6,49.7C54.6,61.3,40.1,69,24.7,74.3C9.3,79.6,-7,82.5,-23.6,79.5C-40.2,76.5,-57.1,67.5,-67.2,54.2C-77.3,40.8,-80.6,23,-79.9,6.1C-79.3,-10.7,-74.7,-26.7,-65.8,-39.5C-56.9,-52.3,-43.6,-62,-29.5,-70.5C-15.4,-79.1,-0.4,-86.6,14,-85.8C28.5,-85,46.4,-76,45.7,-78.2Z" transform="translate(100 100)" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
