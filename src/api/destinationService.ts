
// This file provides functions to fetch destination data
import { Destination } from "@/components/dashboard/DestinationCard";

// Mock data for sample destinations
const sampleDestinations: Destination[] = [
  {
    id: "1",
    name: "Barcelona, Spain",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1470&auto=format&fit=crop",
    safetyScore: 8.5,
    description:
      "A vibrant city known for its art and architecture. The Sagrada Família and other modernist landmarks designed by Antoni Gaudí dot the city.",
  },
  {
    id: "2",
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1473&auto=format&fit=crop",
    safetyScore: 7.8,
    description:
      "The City of Light draws millions of visitors every year with its unforgettable ambiance. The city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.",
  },
  {
    id: "3",
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1336&auto=format&fit=crop",
    safetyScore: 9.2,
    description:
      "Tokyo is Japan's busy capital that mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples.",
  },
  {
    id: "4",
    name: "Lisbon, Portugal",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1470&auto=format&fit=crop",
    safetyScore: 8.3,
    description:
      "Lisbon, Portugal's hilly capital, is a coastal city known for its pastel-colored buildings, tile-covered facades, and vintage trams.",
  },
  {
    id: "5",
    name: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1552&auto=format&fit=crop",
    safetyScore: 9.5,
    description:
      "Singapore is a island city-state known for its tropical climate, multicultural population, and modern skyline.",
  },
  {
    id: "6",
    name: "Zurich, Switzerland",
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=1474&auto=format&fit=crop",
    safetyScore: 9.3,
    description:
      "Zurich is Switzerland's center of economic life and education. Located in the heart of Europe, the city offers a mixture of adventure, pleasure, nature, and culture.",
  },
  {
    id: "7",
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1470&auto=format&fit=crop",
    safetyScore: 7.5,
    description:
      "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial and cultural centers.",
  },
  {
    id: "8",
    name: "London, UK",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1470&auto=format&fit=crop",
    safetyScore: 8.0,
    description:
      "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic 'Big Ben' clock tower and Westminster Abbey.",
  },
  {
    id: "9",
    name: "Sydney, Australia",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1470&auto=format&fit=crop",
    safetyScore: 9.0,
    description:
      "Sydney, capital of New South Wales and one of Australia's largest cities, is best known for its harbourfront Sydney Opera House, with a distinctive sail-like design. Massive Darling Harbour and the smaller Circular Quay port are hubs of waterside life.",
  },
];

// Destination images for dynamically generated destinations
const destinationImages = [
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490959231512-65fba63aa0c1?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1368&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?q=80&w=1374&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1470&auto=format&fit=crop",
];

// Function to fetch all destinations
export const fetchDestinations = async (): Promise<Destination[]> => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return sampleDestinations;
};

// Function to fetch a destination by ID
export const fetchDestinationById = async (id: string): Promise<Destination | null> => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const destination = sampleDestinations.find((dest) => dest.id === id);
  return destination || null;
};

// Generate a pseudo-random but consistent safety score for a location
const getSafetyScore = (locationName: string): number => {
  // Create a simple hash from the string to get consistent results
  let hash = 0;
  for (let i = 0; i < locationName.length; i++) {
    hash = ((hash << 5) - hash) + locationName.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Generate a score between 6.0 and 9.5
  const baseScore = Math.abs(hash % 35) / 10 + 6.0;
  return Math.round(baseScore * 10) / 10;
};

// Create a more realistic description for a location
const generateDescription = (locationName: string): string => {
  const descriptions = [
    `${locationName} offers travelers a blend of historic sites, cultural experiences, and natural beauty. Visitors can explore local landmarks, sample the distinctive cuisine, and immerse themselves in the unique atmosphere of this destination.`,
    `Known for its distinctive charm, ${locationName} attracts tourists from around the world. The destination features a mix of architectural styles, vibrant local culture, and opportunities for both relaxation and adventure.`,
    `${locationName} is a destination that combines the old and the new. Travelers can discover centuries of history alongside modern attractions, making it ideal for visitors with diverse interests.`,
    `Explore the wonders of ${locationName}, where travelers can experience authentic local traditions, visit significant landmarks, and enjoy the region's natural landscapes.`,
    `${locationName} welcomes visitors with its unique character and varied attractions. The destination offers something for every type of traveler, from history enthusiasts to nature lovers.`
  ];
  
  // Use the location name to select a consistent description
  const index = Math.abs(locationName.length % descriptions.length);
  return descriptions[index];
};

// Function to search for destinations by query
export const searchDestinations = async (query: string): Promise<Destination[]> => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 700));
  
  // First, check if the query matches any of our sample destinations
  const filteredDestinations = sampleDestinations.filter((dest) =>
    dest.name.toLowerCase().includes(query.toLowerCase()) ||
    dest.description.toLowerCase().includes(query.toLowerCase())
  );
  
  // If we have results from our sample data, return them
  if (filteredDestinations.length > 0) {
    return filteredDestinations;
  }
  
  // If not found in sample data, generate a new destination based on the search query
  // In a real app, this would be an API call to a service like Google Places API
  
  // Format the destination name properly (capitalize first letter of each word)
  const formattedName = query.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
    
  // Get a consistent image for this destination
  const imageIndex = Math.abs(formattedName.length % destinationImages.length);
  
  const generatedDestination: Destination = {
    id: `search-${Date.now()}`, // Generate a unique ID
    name: formattedName,
    image: destinationImages[imageIndex],
    safetyScore: getSafetyScore(formattedName),
    description: generateDescription(formattedName),
  };
  
  return [generatedDestination];
};

// Weather condition options with weighted probabilities
const weatherConditions = [
  { condition: "Sunny", weight: 30 },
  { condition: "Partly Cloudy", weight: 25 },
  { condition: "Cloudy", weight: 20 },
  { condition: "Rainy", weight: 15 },
  { condition: "Stormy", weight: 10 }
];

// Function to get weighted random weather condition
const getWeightedRandomWeather = () => {
  const totalWeight = weatherConditions.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const item of weatherConditions) {
    if (random < item.weight) {
      return item.condition;
    }
    random -= item.weight;
  }
  
  return weatherConditions[0].condition; // Default fallback
};

// Realistic seasonal temperature ranges
const getSeasonalTemperature = (locationName: string) => {
  // Get current month (1-12)
  const month = new Date().getMonth() + 1;
  
  // Simple hash function to get consistent but varied temps for different cities
  let hash = 0;
  for (let i = 0; i < locationName.length; i++) {
    hash = ((hash << 5) - hash) + locationName.charCodeAt(i);
    hash = hash & hash;
  }
  const locationVariance = Math.abs(hash % 10) - 5; // -5 to +4
  
  // Northern hemisphere
  if (month >= 3 && month <= 5) { // Spring
    return 15 + locationVariance + Math.round(Math.random() * 6 - 3);
  } else if (month >= 6 && month <= 8) { // Summer
    return 25 + locationVariance + Math.round(Math.random() * 6 - 3);
  } else if (month >= 9 && month <= 11) { // Fall
    return 15 + locationVariance + Math.round(Math.random() * 6 - 3);
  } else { // Winter
    return 5 + locationVariance + Math.round(Math.random() * 6 - 3);
  }
};

// Function to fetch weather data for a location
export const fetchWeatherData = async (location: string) => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 500));
  
  // In a real app, this would call an actual weather API
  const currentTemperature = getSeasonalTemperature(location);
  const randomWeather = getWeightedRandomWeather();
  
  // Get day names for the next 3 days
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date().getDay();
  const forecast = [];
  
  for (let i = 1; i <= 3; i++) {
    const dayIndex = (today + i) % 7;
    forecast.push({
      day: days[dayIndex],
      temp: currentTemperature + Math.round(Math.random() * 6 - 3) // ±3°C variation
    });
  }
  
  return {
    current: {
      condition: randomWeather,
      temperature: currentTemperature,
      humidity: Math.round(Math.random() * 50 + 30), // Random humidity 30-80%
      wind: Math.round(Math.random() * 20), // Random wind speed 0-20 km/h
    },
    forecast: forecast
  };
};

// Alert types with different severities
const alertTypes = [
  { type: "Weather", title: "Seasonal Weather Alert", description: "Check local forecast before traveling as conditions may change rapidly.", severity: "low" },
  { type: "Health", title: "Health Advisory", description: "Some vaccinations recommended for travel to this region. Consult with a healthcare provider.", severity: "medium" },
  { type: "Travel", title: "Travel Advisory", description: "Check local laws and customs before visiting. Some areas may have specific regulations.", severity: "low" },
  { type: "Security", title: "Security Notice", description: "Exercise normal security precautions and be aware of your surroundings.", severity: "low" },
  { type: "Transport", title: "Transportation Alert", description: "Local transportation may be affected by ongoing infrastructure projects.", severity: "low" },
  { type: "Environment", title: "Environmental Alert", description: "Be aware of local environmental conditions and follow sustainability guidelines.", severity: "medium" },
  { type: "Political", title: "Political Situation", description: "Stay informed about the local political climate which may affect travel plans.", severity: "medium" },
  { type: "Event", title: "Major Event", description: "A significant event is taking place that may affect accommodation availability and crowds.", severity: "low" },
];

// Function to fetch safety alerts for a location
export const fetchSafetyAlerts = async (location: string) => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 700 + Math.random() * 500));
  
  // Use location name to determine alert count (some consistent randomness)
  let hash = 0;
  for (let i = 0; i < location.length; i++) {
    hash = ((hash << 5) - hash) + location.charCodeAt(i);
    hash = hash & hash;
  }
  
  // Determine if we should show alerts based on location hash
  const showAlerts = Math.abs(hash % 4) !== 0; // 75% chance to show alerts
  
  if (!showAlerts) {
    return [];
  }
  
  // Generate 1-3 random alerts
  const alertCount = (Math.abs(hash % 3) + 1);
  const alerts = [];
  const usedAlertTypes = new Set();
  
  for (let i = 0; i < alertCount; i++) {
    // Pick a random alert type that hasn't been used yet
    let availableAlerts = alertTypes.filter((_, index) => !usedAlertTypes.has(index));
    
    // If we've used all alert types, break the loop
    if (availableAlerts.length === 0) break;
    
    const alertIndex = Math.abs((hash + i) % availableAlerts.length);
    const randomAlert = availableAlerts[alertIndex];
    usedAlertTypes.add(alertTypes.indexOf(randomAlert));
    
    // Add some randomness to severity based on location
    let severity = randomAlert.severity;
    if (location.length % 5 === 0 && severity === "low") {
      severity = "medium";
    } else if (location.length % 7 === 0 && severity === "medium") {
      severity = "high";
    }
    
    alerts.push({
      id: i + 1,
      type: randomAlert.type,
      title: randomAlert.title,
      description: randomAlert.description,
      severity: severity
    });
  }
  
  return alerts;
};

// Travel tip categories
const travelTipCategories = [
  {
    category: "Local Transportation",
    tips: [
      "Research public transportation options before your trip. Consider getting a transit pass for your stay.",
      "Download local transportation apps to navigate the city efficiently.",
      "Taxis may be more expensive than public transport but can be more convenient for certain destinations.",
      "Renting a bicycle can be a great way to explore the city at your own pace.",
      "Walking tours are an excellent way to discover hidden gems and learn about local history."
    ]
  },
  {
    category: "Cultural Customs",
    tips: [
      "Learn about local customs and etiquette to respectfully engage with the local culture.",
      "Learn a few basic phrases in the local language - even simple greetings are appreciated.",
      "Research appropriate dress codes, especially when visiting religious sites.",
      "Be aware of tipping customs which vary significantly between countries.",
      "Respect local traditions and participate in cultural events when invited."
    ]
  },
  {
    category: "Safety Precautions",
    tips: [
      "Keep your valuables secure and be aware of your surroundings, especially in crowded tourist areas.",
      "Make digital copies of important documents like your passport and travel insurance.",
      "Register with your country's embassy or consulate before traveling to remote areas.",
      "Know the local emergency numbers and location of the nearest hospital.",
      "Get travel insurance that covers both health emergencies and trip cancellations."
    ]
  },
  {
    category: "Local Cuisine",
    tips: [
      "Try the local cuisine but be cautious with street food if you have a sensitive stomach.",
      "Ask locals for restaurant recommendations to find authentic dining experiences.",
      "Food tours can be a great introduction to local specialties and culinary traditions.",
      "Be aware of common allergens in local cuisine and learn how to communicate dietary restrictions.",
      "Markets are often the best place to sample a variety of local foods at reasonable prices."
    ]
  },
  {
    category: "Weather Considerations",
    tips: [
      "Pack appropriate clothing for the season and be prepared for unexpected weather changes.",
      "Sunscreen and hydration are important even in cooler climates.",
      "Check the forecast daily and adjust your plans according to weather conditions.",
      "Be aware of extreme weather seasons that might affect your travel experience.",
      "Indoor activities like museums and galleries make good backup plans for rainy days."
    ]
  },
  {
    category: "Shopping Tips",
    tips: [
      "Research local markets and shopping districts before your trip.",
      "Learn about haggling customs, as fixed prices aren't universal in all markets.",
      "Look for locally-made products as unique souvenirs that support the local economy.",
      "Be aware of customs regulations before purchasing items to bring home.",
      "Save receipts for valuable purchases, especially if you plan to claim tax refunds."
    ]
  }
];

// Function to fetch travel tips for a location
export const fetchTravelTips = async (location: string) => {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 550 + Math.random() * 400));
  
  // Use location name to select consistent categories
  let hash = 0;
  for (let i = 0; i < location.length; i++) {
    hash = ((hash << 5) - hash) + location.charCodeAt(i);
    hash = hash & hash;
  }
  
  const selectedTips = [];
  const usedCategories = new Set();
  
  // Select 3 random categories
  for (let i = 0; i < 3; i++) {
    const categoryIndex = Math.abs((hash + i * 13) % travelTipCategories.length);
    
    // Skip if we've already used this category
    if (usedCategories.has(categoryIndex)) continue;
    usedCategories.add(categoryIndex);
    
    const category = travelTipCategories[categoryIndex];
    const tipIndex = Math.abs((hash + i * 7) % category.tips.length);
    
    selectedTips.push({
      id: i + 1,
      title: category.category,
      description: category.tips[tipIndex]
    });
  }
  
  return selectedTips;
};
