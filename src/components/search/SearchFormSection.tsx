
import React from "react";
import { Search, MapPin, Shield } from "lucide-react";
import SearchForm from "@/components/search/SearchForm";

interface SearchFormSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  safetyQuery: string;
  setSafetyQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleSafetySearch: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const SearchFormSection: React.FC<SearchFormSectionProps> = ({
  searchQuery,
  setSearchQuery,
  safetyQuery,
  setSafetyQuery,
  handleSearch,
  handleSafetySearch,
  isLoading
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      {/* Destination search bar */}
      <div className="flex flex-col">
        <label className="mb-2 font-medium flex items-center">
          <MapPin className="mr-1 h-4 w-4" />
          Find a destination
        </label>
        <SearchForm
          query={searchQuery}
          setQuery={setSearchQuery}
          handleSubmit={handleSearch}
          isLoading={isLoading}
          icon={<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />}
          placeholder="Search any destination..."
          buttonText="Search"
        />
      </div>

      {/* Safety chatbot search bar */}
      <div className="flex flex-col">
        <label className="mb-2 font-medium flex items-center">
          <Shield className="mr-1 h-4 w-4" />
          Ask about safety
        </label>
        <SearchForm
          query={safetyQuery}
          setQuery={setSafetyQuery}
          handleSubmit={handleSafetySearch}
          isLoading={isLoading}
          icon={<Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />}
          placeholder="Is Tokyo safe? Should I visit Paris?"
          buttonText="Ask"
          buttonClassName="bg-blue-500 hover:bg-blue-600"
        />
      </div>
    </div>
  );
};

export default SearchFormSection;
