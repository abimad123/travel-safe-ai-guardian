
import React from "react";
import { Search, MapPin, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  query: string;
  setQuery: (query: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  icon: React.ReactNode;
  placeholder: string;
  buttonText: string;
  buttonClassName?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  setQuery,
  handleSubmit,
  isLoading,
  icon,
  placeholder,
  buttonText,
  buttonClassName = "",
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          {icon}
          <Input
            type="text"
            placeholder={placeholder}
            className="pl-10 py-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading} className={buttonClassName}>
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
