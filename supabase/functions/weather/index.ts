
import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Get the API key from environment variables
const OPENWEATHER_API_KEY = Deno.env.get('OPENWEATHER_API_KEY');

// OpenWeatherMap API endpoints
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the location from the request
    const { location } = await req.json();
    
    if (!location) {
      return new Response(
        JSON.stringify({ error: 'Location is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!OPENWEATHER_API_KEY) {
      console.error('OpenWeather API key is not set');
      return new Response(
        JSON.stringify({ error: 'Weather service configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Fetching weather data for: ${location}`);

    // Fetch current weather and forecast in parallel
    const [currentWeatherRes, forecastRes] = await Promise.all([
      fetch(`${CURRENT_WEATHER_URL}?q=${encodeURIComponent(location)}&units=metric&appid=${OPENWEATHER_API_KEY}`),
      fetch(`${FORECAST_URL}?q=${encodeURIComponent(location)}&units=metric&appid=${OPENWEATHER_API_KEY}`)
    ]);

    // Handle errors from OpenWeatherMap API
    if (!currentWeatherRes.ok) {
      const errorData = await currentWeatherRes.json();
      console.error('OpenWeatherMap API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Could not fetch weather data for this location' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse the responses
    const currentWeatherData = await currentWeatherRes.json();
    const forecastData = await forecastRes.json();

    // Extract the daily forecast (one entry per day)
    const dailyForecast = [];
    const processedDates = new Set();
    
    if (forecastData && forecastData.list) {
      // Get the next 3 days
      for (const item of forecastData.list) {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        // Only take one forecast per day
        if (!processedDates.has(day) && processedDates.size < 3) {
          processedDates.add(day);
          dailyForecast.push({
            day,
            temp: Math.round(item.main.temp)
          });
        }
        
        if (processedDates.size >= 3) break;
      }
    }

    // Format the weather data response
    const weatherData = {
      current: {
        condition: currentWeatherData.weather[0].main,
        temperature: Math.round(currentWeatherData.main.temp),
        humidity: currentWeatherData.main.humidity,
        wind: Math.round(currentWeatherData.wind.speed),
        icon: currentWeatherData.weather[0].icon,
      },
      forecast: dailyForecast,
      location: {
        name: currentWeatherData.name,
        country: currentWeatherData.sys.country
      }
    };

    return new Response(
      JSON.stringify(weatherData),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  
  } catch (error) {
    console.error('Error in weather function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process weather request' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
