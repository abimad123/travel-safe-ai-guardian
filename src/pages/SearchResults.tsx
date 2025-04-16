
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchDestinations } from "@/api/destinationService";
import { Destination } from "@/components/dashboard/DestinationCard";
import DestinationCard from "@/components/dashboard/DestinationCard";
import SafetyQueryResponse from "@/components/search/SafetyQueryResponse";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Search, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [safetyQuery, setSafetyQuery] = useState("");
  const [results, setResults] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Detect if the query is asking about safety
  const isSafetyQuery = /\b(safe|safety|danger|dangerous|risk|crime|secure|should i go|should i visit)\b/i.test(query);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      try {
        if (!query) {
          setResults([]);
          return;
        }
        
        const searchResults = await searchDestinations(query);
        setResults(searchResults);
        
        // Show a toast if we're showing a generated result (not from predefined list)
        if (searchResults.length === 1 && searchResults[0].id.startsWith('search-')) {
          toast.info("Generated results for your search query with real-time weather data.");
        }
        
        // Show specific toast for safety queries
        if (isSafetyQuery && searchResults.length > 0) {
          toast.info("Showing safety information for your query.");
        }
      } catch (error) {
        console.error("Error searching destinations:", error);
        toast.error("Failed to load search results");
      } finally {
        setIsLoading(false);
      }
    };

    search();
    setSearchQuery(query);
  }, [query, isSafetyQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchParams({ q: searchQuery });
  };

  const handleSafetySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!safetyQuery.trim()) return;
    
    // Add safety keywords if they're not already in the query
    let enhancedQuery = safetyQuery;
    if (!/(safe|safety|danger|dangerous|should)/i.test(safetyQuery)) {
      enhancedQuery = `Is ${safetyQuery} safe to visit?`;
    }
    
    setSearchParams({ q: enhancedQuery });
    setSafetyQuery("");
  };

  const handleCardClick = (destination: Destination) => {
    // When clicking on a search-generated destination, pass the search query
    if (destination.id.startsWith('search-')) {
      navigate(`/destination/${destination.id}?q=${encodeURIComponent(query)}`);
    } else {
      // For regular destinations, keep the normal behavior
      navigate(`/destination/${destination.id}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Search Results for "{query}"</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {/* Destination search bar */}
        <form onSubmit={handleSearch} className="flex flex-col">
          <label className="mb-2 font-medium flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            Find a destination
          </label>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search any destination..."
                className="pl-10 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              Search
            </Button>
          </div>
        </form>

        {/* Safety chatbot search bar */}
        <form onSubmit={handleSafetySearch} className="flex flex-col">
          <label className="mb-2 font-medium flex items-center">
            <Shield className="mr-1 h-4 w-4" />
            Ask about safety
          </label>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
              <Input
                type="text"
                placeholder="Is Tokyo safe? Should I visit Paris?"
                className="pl-10 py-2 border-blue-200"
                value={safetyQuery}
                onChange={(e) => setSafetyQuery(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-600">
              Ask
            </Button>
          </div>
        </form>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-2 text-gray-600">Searching destinations...</p>
        </div>
      ) : results.length > 0 ? (
        <div>
          {/* Display safety response at the top for safety queries */}
          {isSafetyQuery && results.map(destination => (
            <SafetyQueryResponse 
              key={`safety-${destination.id}`} 
              destination={destination} 
              query={query} 
            />
          ))}
          
          {/* Quick safety examples if user is viewing safety results */}
          {isSafetyQuery && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Try other safety questions:</h3>
                <div className="flex flex-wrap gap-2">
                  {["Is Paris safe at night?", "Should I visit Tokyo?", "Barcelona crime rate", "London safety tips"].map((example, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => setSearchParams({ q: example })}
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      {example}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
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
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No destinations found matching "{query}"</p>
          <Button asChild className="mt-4">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
