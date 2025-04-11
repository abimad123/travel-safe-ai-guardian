
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Shield, AlertTriangle, Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  fetchDestinationById, 
  fetchWeatherData, 
  fetchSafetyAlerts, 
  fetchTravelTips,
  searchDestinations
} from "@/api/destinationService";
import { Destination } from "@/components/dashboard/DestinationCard";
import { toast } from "sonner";

interface SafetyInfo {
  crime: number;
  health: number;
  environment: number;
  overall: number;
}

interface Alert {
  id: number;
  type: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
}

interface TravelTip {
  id: number;
  title: string;
  description: string;
}

interface WeatherData {
  current: {
    condition: string;
    temperature: number;
    humidity: number;
    wind: number;
  };
  forecast: {
    day: string;
    temp: number;
  }[];
}

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [safetyInfo, setSafetyInfo] = useState<SafetyInfo | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [travelTips, setTravelTips] = useState<TravelTip[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const loadDestination = async () => {
      setLoading(true);
      try {
        if (!id) return;
        
        let destData: Destination | null = null;
        
        // Check if this is a search-generated ID or a regular ID
        if (id.startsWith('search-')) {
          // This is a dynamically generated destination from search
          // We need to extract the search query from the URL or localStorage
          const searchParams = new URLSearchParams(window.location.search);
          const query = searchParams.get('from') || '';
          
          if (query) {
            // Re-fetch the destination data based on the search query
            const results = await searchDestinations(query);
            if (results.length > 0) {
              destData = results[0];
            }
          }
          
          // If we couldn't get it from the URL, try to use the current destination name
          if (!destData && destination) {
            destData = destination;
          }
        } else {
          // Regular destination ID
          destData = await fetchDestinationById(id);
        }
        
        if (!destData) {
          toast.error("Destination not found");
          return;
        }
        
        setDestination(destData);
        
        // Generate safety data for this destination
        setSafetyInfo({
          crime: Math.floor(Math.random() * 3) + 7,
          health: Math.floor(Math.random() * 3) + 7,
          environment: Math.floor(Math.random() * 3) + 7,
          overall: destData.safetyScore,
        });
        
        // Fetch real-time data for this destination
        const locationName = destData.name.split(',')[0]; // Get just the city name
        
        // Fetch alerts, weather, and travel tips in parallel
        const [alertsData, weatherData, tipsData] = await Promise.all([
          fetchSafetyAlerts(locationName),
          fetchWeatherData(locationName),
          fetchTravelTips(locationName)
        ]);
        
        setAlerts(alertsData);
        setWeather(weatherData);
        setTravelTips(tipsData);
        
      } catch (error) {
        console.error("Error loading destination:", error);
        toast.error("Failed to load destination information");
      } finally {
        setLoading(false);
      }
    };

    loadDestination();
  }, [id]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };
  
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        );
      case "partly cloudy":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
            <path d="M10 16a4 4 0 1 1 8 0" />
            <path d="M8 16h.01" />
            <path d="M16 16h.01" />
            <path d="M12 12h.01" />
            <path d="M12 19a7 7 0 1 0-7-7" />
            <path d="M12 12a5 5 0 0 0-5 5" />
          </svg>
        );
      case "cloudy":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
            <path d="M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        );
      case "rainy":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M16 14v6" />
            <path d="M8 14v6" />
            <path d="M12 16v6" />
          </svg>
        );
      case "stormy":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600">
            <path d="M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            <path d="M9.2 15.3l-1.4 1.4" />
            <path d="m13.9 12.1-1.4 1.4" />
            <path d="m16.2 16.9-1.4-1.4" />
            <path d="m7.4 11.6 1.4 1.4" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
            <path d="M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-2 text-gray-600">Loading destination information...</p>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">Destination Not Found</h2>
        <p className="mt-2 text-gray-600">We couldn't find the destination you're looking for.</p>
        <Button asChild className="mt-4">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-4">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-6">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center mb-2">
            <MapPin className="text-white mr-1" size={20} />
            <h1 className="text-3xl md:text-4xl font-bold text-white">{destination.name}</h1>
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white ${getScoreColor(destination.safetyScore)} mb-2`}>
            <Shield className="mr-1" size={16} />
            Safety Score: {destination.safetyScore}/10
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">About {destination.name}</h2>
              <p className="text-gray-700">{destination.description}</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Safety Information</h3>
              {safetyInfo && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Overall</p>
                    <p className={`text-xl font-bold ${getScoreColor(safetyInfo.overall)}`}>
                      {safetyInfo.overall}/10
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Crime</p>
                    <p className={`text-xl font-bold ${getScoreColor(safetyInfo.crime)}`}>
                      {safetyInfo.crime}/10
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Health</p>
                    <p className={`text-xl font-bold ${getScoreColor(safetyInfo.health)}`}>
                      {safetyInfo.health}/10
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Environment</p>
                    <p className={`text-xl font-bold ${getScoreColor(safetyInfo.environment)}`}>
                      {safetyInfo.environment}/10
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="mr-2 text-yellow-500" />
                <h2 className="text-2xl font-semibold">Current Alerts</h2>
              </div>
              
              {alerts.length > 0 ? (
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="border-l-4 border-yellow-500 pl-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{alert.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No current alerts for this destination.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Info className="mr-2 text-blue-500" />
                <h2 className="text-2xl font-semibold">Travel Tips</h2>
              </div>
              
              {travelTips.length > 0 ? (
                <div className="space-y-4">
                  {travelTips.map((tip) => (
                    <div key={tip.id} className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800">{tip.title}</h3>
                      <p className="text-gray-700 mt-1">{tip.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No travel tips available for this destination.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add to Your Trip</h2>
              <Button className="w-full mb-4" asChild>
                <Link to={`/trip-planner?destination=${encodeURIComponent(destination.name)}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Trip Planner
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Weather</h2>
              {weather ? (
                <>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Current Conditions</p>
                    <div className="flex justify-center my-2">
                      {getWeatherIcon(weather.current.condition)}
                    </div>
                    <p className="text-2xl font-bold">{weather.current.temperature}°C</p>
                    <p className="text-sm text-gray-600">{weather.current.condition}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                      <div>Humidity: {weather.current.humidity}%</div>
                      <div>Wind: {weather.current.wind} km/h</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    {weather.forecast.map((day, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">{day.day}</p>
                        <p className="font-bold">{day.temp}°</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                  <p className="mt-2 text-sm text-gray-500">Loading weather data...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
