import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { searchDestinations } from "@/api/destinationService";
import { Destination } from "@/components/dashboard/DestinationCard";
import SafetyQueryResponse from "@/components/search/SafetyQueryResponse";
import DestinationNews from "@/components/search/DestinationNews";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import SearchFormSection from "@/components/search/SearchFormSection";
import LoadingIndicator from "@/components/search/LoadingIndicator";
import InvalidQueryMessage from "@/components/search/InvalidQueryMessage";
import NoResults from "@/components/search/NoResults";
import SafetyExamples from "@/components/search/SafetyExamples";
import DestinationResults from "@/components/search/DestinationResults";
import { getPrimaryLocationName, isReasonableLocationQuery } from "@/utils/locationUtils";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [safetyQuery, setSafetyQuery] = useState("");
  const [results, setResults] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidQuery, setIsInvalidQuery] = useState(false);
  
  // Detect if the query is asking about safety
  const isSafetyQuery = /\b(safe|safety|danger|dangerous|risk|crime|secure|should i go|should i visit)\b/i.test(query);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      setIsInvalidQuery(false);
      
      try {
        if (!query) {
          setResults([]);
          return;
        }
        
        // For any queries, we need to validate that it contains a real location name
        if (!isReasonableLocationQuery(query)) {
          setIsInvalidQuery(true);
          setResults([]);
          setIsLoading(false);
          return;
        }
        
        const searchResults = await searchDestinations(query);
        
        // If no results and it seems like an invalid location query
        if (searchResults.length === 0) {
          setIsInvalidQuery(true);
          setResults([]);
        } else {
          setResults(searchResults);
          
          // Show a toast if we're showing a generated result (not from predefined list)
          if (searchResults.length === 1 && searchResults[0].id.startsWith('search-') && !isSafetyQuery) {
            toast.info("Generated results for your search query with real-time weather data.");
          }
          
          // Show specific toast for safety queries
          if (isSafetyQuery && searchResults.length > 0) {
            toast.info("Showing safety information for your query.");
          }
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
    
    if (!isReasonableLocationQuery(searchQuery)) {
      toast.error("Please enter a valid destination name");
      return;
    }
    
    setSearchParams({ q: searchQuery });
  };

  const handleSafetySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!safetyQuery.trim()) return;
    
    // Validate location query
    const words = safetyQuery.split(/\s+/);
    const potentialLocationNames = words.filter(word => 
      word.length >= 3 && /^[A-Z][a-z]+$/.test(word)
    );
    
    const containsKnownLocation = /(paris|tokyo|london|rome|bangkok|bali|sydney|new york|mexico|india|bangkok|japan|china|thailand|europe)/i.test(safetyQuery);
    
    if (potentialLocationNames.length === 0 && !containsKnownLocation) {
      toast.error("Please include a specific location in your safety question");
      return;
    }
    
    // Add safety keywords if they're not already in the query
    let enhancedQuery = safetyQuery;
    if (!/(safe|safety|danger|dangerous|should)/i.test(safetyQuery)) {
      enhancedQuery = `Is ${safetyQuery} safe to visit?`;
    }
    
    setSearchParams({ q: enhancedQuery });
    setSafetyQuery("");
  };

  const handleCardClick = (destination: Destination) => {
    // Only allow clicking through to destination details for non-safety queries
    if (!isSafetyQuery) {
      // When clicking on a search-generated destination, pass the search query
      if (destination.id.startsWith('search-')) {
        navigate(`/destination/${destination.id}?q=${encodeURIComponent(query)}`);
      } else {
        // For regular destinations, keep the normal behavior
        navigate(`/destination/${destination.id}`);
      }
    }
  };

  const locationName = getPrimaryLocationName(query, results);

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

      <SearchFormSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        safetyQuery={safetyQuery}
        setSafetyQuery={setSafetyQuery}
        handleSearch={handleSearch}
        handleSafetySearch={handleSafetySearch}
        isLoading={isLoading}
      />

      {isLoading ? (
        <LoadingIndicator />
      ) : isInvalidQuery ? (
        <InvalidQueryMessage isSafetyQuery={isSafetyQuery} />
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
          
          {/* Display latest news about the destination */}
          {!isSafetyQuery && (
            <div className="mb-6">
              <DestinationNews locationName={locationName} />
            </div>
          )}
          
          {/* Quick safety examples if user is viewing safety results */}
          {isSafetyQuery && <SafetyExamples />}
          
          {/* Only show destination cards for non-safety queries */}
          {!isSafetyQuery && (
            <DestinationResults 
              results={results} 
              query={query} 
              handleCardClick={handleCardClick} 
            />
          )}
        </div>
      ) : (
        <NoResults query={query} />
      )}
    </div>
  );
};

export default SearchResults;
