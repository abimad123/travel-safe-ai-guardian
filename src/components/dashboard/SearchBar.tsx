
import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
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
    
    // Show suggestions if the input has at least 2 characters
    if (value.length >= 2) {
      const filtered = popularDestinations.filter(dest => 
        dest.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Show max 5 suggestions
      setSuggestions(filtered);
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

  return (
    <div className="mb-10 relative">
      <form onSubmit={handleSearch} className="flex gap-2 max-w-3xl mx-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search any destination worldwide..."
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={handleInputChange}
            disabled={isSearching}
            autoComplete="off"
          />
          
          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                  <span>{suggestion}</span>
                </div>
              ))}
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
    </div>
  );
};

export default SearchBar;
