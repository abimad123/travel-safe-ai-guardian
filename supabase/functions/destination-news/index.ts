
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { locationName } = await req.json();
    
    if (!locationName || typeof locationName !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Location name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const NEWS_API_KEY = Deno.env.get('NEWS_API_KEY');
    if (!NEWS_API_KEY) {
      throw new Error('NEWS_API_KEY environment variable not set');
    }

    // Get current date and date from 30 days ago for news filtering
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    const fromDate = thirtyDaysAgo.toISOString().split('T')[0];
    const toDate = today.toISOString().split('T')[0];
    
    // Fetch news articles about the location
    const newsResponse = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(locationName)}+travel+tourism&from=${fromDate}&to=${toDate}&sortBy=relevancy&language=en&pageSize=5&apiKey=${NEWS_API_KEY}`
    );
    
    if (!newsResponse.ok) {
      const errorData = await newsResponse.json();
      console.error('News API error:', errorData);
      throw new Error(`News API error: ${errorData.message || 'Unknown error'}`);
    }
    
    const newsData = await newsResponse.json();
    
    // Format and filter the news data
    const articles = newsData.articles
      .filter(article => article.title && article.description && article.url)
      .map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source.name,
        urlToImage: article.urlToImage || null
      }));
    
    return new Response(
      JSON.stringify({ articles }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error fetching destination news:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to fetch news data' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

