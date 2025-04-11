
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchDestinations } from "@/api/destinationService";
import { Destination } from "@/components/dashboard/DestinationCard";
import DestinationCard from "@/components/dashboard/DestinationCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
          toast.info("Generated results for your search query. In a production app, this would use real data from an API.");
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
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchParams({ q: searchQuery });
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

      {/* New inline search bar */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Try another destination..."
            className="pl-10 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          Search
        </Button>
      </form>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-2 text-gray-600">Searching destinations...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((destination) => (
            <DestinationCard 
              key={destination.id} 
              destination={destination} 
              searchQuery={query}
            />
          ))}
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
