
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";

interface InvalidQueryMessageProps {
  isSafetyQuery: boolean;
}

const InvalidQueryMessage: React.FC<InvalidQueryMessageProps> = ({ isSafetyQuery }) => {
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="text-center py-8">
      <Card className="max-w-2xl mx-auto border-l-4 border-yellow-400 bg-yellow-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">Invalid search query</h3>
          <p className="text-gray-700 mb-4">
            Please provide a valid location name for your {isSafetyQuery ? "safety" : ""} query. For example:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {isSafetyQuery ? 
              ["Is Paris safe?", "Tokyo safety", "Should I visit Rome?", "Is Bangkok dangerous?"].map((example, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  size="sm" 
                  className="text-sm" 
                  onClick={() => setSearchParams({ q: example })}
                >
                  {example}
                </Button>
              )) :
              ["Paris", "Tokyo", "New York", "Barcelona", "Sydney"].map((example, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  size="sm" 
                  className="text-sm" 
                  onClick={() => setSearchParams({ q: example })}
                >
                  {example}
                </Button>
              ))
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvalidQueryMessage;
