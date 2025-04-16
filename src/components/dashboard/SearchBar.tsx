
import { Search, MapPin, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [safetyExamples, setSafetyExamples] = useState<string[]>([
    "Is Paris safe to visit?",
    "Should I go to Tokyo?",
    "Safety in Barcelona",
    "Is New York dangerous?",
    "Is it safe to travel to London?"
  ]);
  const navigate = useNavigate();

  // Popular destinations for suggestions
  const popularDestinations = [
    "New York", "London", "Tokyo", "Paris", "Sydney", 
    "Rome", "Bangkok", "Dubai", "Singapore", "Barcelona",
    "Istanbul", "Amsterdam", "Hong Kong", "Rio de Janeiro", "Berlin",
    "Mumbai", "Cairo", "Seoul", "Mexico City", "Toronto",
    "Vienna", "Madrid", "Athens", "Prague", "Copenhagen",
    "Moscow", "Dublin", "Stockholm", "Oslo", "Helsinki"
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error("Please enter a destination to search");
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Navigate to search results with the query
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Error searching for destination. Please try again.");
    } finally {
      setIsSearching(false);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Check if the query includes safety-related keywords
    const isSafetyQuery = /\b(safe|safety|danger|risk|should i|visit)\b/i.test(value);
    
    // Show suggestions if the input has at least 2 characters
    if (value.length >= 2) {
      // If it's a safety query, show more targeted suggestions
      if (isSafetyQuery) {
        // Get city names from the query
        const words = value.toLowerCase().split(/\s+/);
        const relevantExamples = safetyExamples.filter(example => {
          return !words.some(word => 
            word.length > 3 && example.toLowerCase().includes(word)
          );
        });
        
        // Also look for city matches in popular destinations
        const cityMatches = popularDestinations.filter(dest => 
          dest.toLowerCase().includes(value.toLowerCase())
        ).map(city => `Is ${city} safe to visit?`);
        
        // Combine and limit to 5 suggestions
        setSuggestions([...cityMatches, ...relevantExamples].slice(0, 5));
      } else {
        // Regular destination suggestions
        const filtered = popularDestinations.filter(dest => 
          dest.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5); // Show max 5 suggestions
        setSuggestions(filtered);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    // Auto search after selecting a suggestion
    navigate(`/search?q=${encodeURIComponent(suggestion.trim())}`);
  };

  const handleSafetyExampleClick = (example: string) => {
    setSearchQuery(example);
    setSuggestions([]);
    // Auto search after selecting an example
    navigate(`/search?q=${encodeURIComponent(example.trim())}`);
  };

  return (
    <div className="mb-10 relative">
      <form onSubmit={handleSearch} className="flex gap-2 max-w-3xl mx-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search any destination or ask about safety..."
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={handleInputChange}
            disabled={isSearching}
            autoComplete="off"
          />
          
          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
              {suggestions.map((suggestion, index) => {
                const isSafetyQuestion = /\b(safe|safety|danger|dangerous|should)\b/i.test(suggestion);
                
                return (
                  <div
                    key={index}
                    className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {isSafetyQuestion ? (
                      <Shield className="mr-2 h-4 w-4 text-blue-500" />
                    ) : (
                      <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                    )}
                    <span>{suggestion}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <Button type="submit" className="py-6 px-6" disabled={isSearching}>
          {isSearching ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2" />
              Searching...
            </>
          ) : (
            "Search"
          )}
        </Button>
      </form>
      
      {/* Safety query examples */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="text-sm text-gray-500 mr-1 w-full text-center">Try safety queries like:</span>
        {safetyExamples.slice(0, 3).map((example, index) => (
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
  );
};

export default SearchBar;
