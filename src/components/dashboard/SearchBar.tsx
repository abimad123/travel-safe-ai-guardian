
import { Search, MapPin, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

const SearchBar = () => {
  const [destinationQuery, setDestinationQuery] = useState("");
  const [safetyQuery, setSafetyQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleDestinationSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destinationQuery.trim()) {
      toast.error("Please enter a destination to search");
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Navigate to search results with the query
      navigate(`/search?q=${encodeURIComponent(destinationQuery.trim())}`);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Error searching for destination. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSafetySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!safetyQuery.trim()) {
      toast.error("Please enter a safety question");
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Add safety context if not present
      let finalQuery = safetyQuery;
      if (!/(safe|safety|danger|dangerous|should)/i.test(safetyQuery)) {
        finalQuery = `Is ${safetyQuery} safe to visit?`;
      }
      
      // Navigate to search results with the safety query
      navigate(`/search?q=${encodeURIComponent(finalQuery)}`);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Error with safety query. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSafetyExampleClick = (example: string) => {
    navigate(`/search?q=${encodeURIComponent(example.trim())}`);
  };

  return (
    <div className="mb-10">
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Destination Search */}
        <Card className="shadow-md border-gray-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-gray-500" />
              Find a Destination
            </h3>
            
            <form onSubmit={handleDestinationSearch}>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search any destination..."
                  className="pl-10 py-6 text-lg"
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                  disabled={isSearching}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 text-lg" 
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2" />
                    Searching...
                  </>
                ) : (
                  "Search Destinations"
                )}
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 mr-1 w-full">Popular destinations:</span>
              {["Tokyo", "Paris", "New York", "Bali", "Rome"].map((dest, index) => (
                <button
                  key={index}
                  onClick={() => setDestinationQuery(dest)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 py-1 px-3 rounded-full flex items-center transition-colors duration-200"
                >
                  <MapPin className="mr-1 h-3 w-3" />
                  {dest}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Safety Search - Chatbot Style */}
        <Card className="shadow-md border-blue-100">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-blue-500" />
              Ask About Travel Safety
            </h3>
            
            <form onSubmit={handleSafetySearch}>
              <div className="relative mb-4">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
                <Input
                  type="text"
                  placeholder="Is Tokyo safe? Should I visit Paris?"
                  className="pl-10 py-6 text-lg border-blue-200"
                  value={safetyQuery}
                  onChange={(e) => setSafetyQuery(e.target.value)}
                  disabled={isSearching}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 text-lg bg-blue-500 hover:bg-blue-600" 
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2" />
                    Processing...
                  </>
                ) : (
                  "Get Safety Information"
                )}
              </Button>
            </form>

            <div className="mt-4">
              <span className="text-sm text-gray-500 mb-2 block">Try safety questions like:</span>
              <div className="flex flex-wrap gap-2">
                {["Is Paris safe to visit?", "Should I go to Rome?", "Is Thailand dangerous?", "Tokyo safety"].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleSafetyExampleClick(example)}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 py-1 px-3 rounded-full flex items-center transition-colors duration-200"
                  >
                    <Shield className="mr-1 h-3 w-3" />
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchBar;
