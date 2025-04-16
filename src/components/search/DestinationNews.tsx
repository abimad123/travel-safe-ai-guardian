
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  urlToImage: string | null;
}

interface DestinationNewsProps {
  locationName: string;
}

const DestinationNews: React.FC<DestinationNewsProps> = ({ locationName }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      if (!locationName) return;
      
      setLoading(true);
      
      try {
        const { data, error } = await supabase.functions.invoke('destination-news', {
          body: { locationName }
        });
        
        if (error) {
          console.error('Error fetching news:', error);
          toast.error('Failed to load news for this destination');
          setArticles([]);
          return;
        }
        
        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        toast.error('Failed to load news for this destination');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [locationName]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center mb-3">
            <Newspaper className="h-5 w-5 mr-2 text-gray-500" />
            <h3 className="text-lg font-semibold">Latest News</h3>
          </div>
          <div className="flex justify-center py-6">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <Newspaper className="h-5 w-5 mr-2 text-gray-500" />
          <h3 className="text-lg font-semibold">Latest News about {locationName}</h3>
        </div>
        
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
              <div className="flex gap-3">
                {article.urlToImage && (
                  <img 
                    src={article.urlToImage} 
                    alt={article.title}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-base line-clamp-2">{article.title}</h4>
                  <p className="text-sm text-gray-600 my-1 line-clamp-2">{article.description}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString()} · {article.source}
                    </span>
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs flex items-center text-blue-600 hover:text-blue-800"
                    >
                      Read more <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationNews;
