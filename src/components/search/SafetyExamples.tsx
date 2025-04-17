
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const SafetyExamples: React.FC = () => {
  const [, setSearchParams] = useSearchParams();

  return (
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
  );
};

export default SafetyExamples;
