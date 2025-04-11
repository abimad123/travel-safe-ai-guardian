
import HeroSection from "@/components/dashboard/HeroSection";
import SearchBar from "@/components/dashboard/SearchBar";
import { Globe, MapPin, Shield, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div>
      <HeroSection />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Search Any Destination Worldwide
        </h2>
        <SearchBar />
        
        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
            <p className="text-gray-600">
              Access detailed information for thousands of destinations around the world.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Safety Updates</h3>
            <p className="text-gray-600">
              Get real-time safety scores and alerts for your chosen destinations.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Compass className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Travel Insights</h3>
            <p className="text-gray-600">
              Discover personalized travel tips and recommendations for your journey.
            </p>
          </div>
        </div>
        
        {/* Popular searches section */}
        <div className="my-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Popular Destinations
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Tokyo", "Paris", "New York", "London", "Rome", "Sydney", "Barcelona", "Singapore"].map((city) => (
              <Link to={`/search?q=${encodeURIComponent(city)}`} key={city}>
                <Button variant="outline" className="px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition duration-200">
                  <MapPin className="mr-1 h-4 w-4" />
                  {city}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
