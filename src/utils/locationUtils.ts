/**
 * Extracts the primary location name from a query or search results
 */
export const getPrimaryLocationName = (query: string, results: any[]): string => {
  if (!query) return '';
  
  // If we have results, use the first result's name (first part)
  if (results.length > 0) {
    return results[0].name.split(',')[0].trim();
  }
  
  // Otherwise extract from the query
  // First, check if the query contains "is" or "in" as in "Is Tokyo safe?"
  const isMatch = query.match(/\b(is|in|about)\s+([A-Z][a-z]+)\b/i);
  if (isMatch && isMatch[2]) {
    return isMatch[2];
  }
  
  // Look for any capitalized words that might be location names
  const words = query.split(/\s+/);
  const locationWords = words.filter(word => 
    word.length >= 3 && /^[A-Z][a-z]+$/.test(word)
  );
  
  if (locationWords.length > 0) {
    return locationWords[0];
  }
  
  // If we couldn't find a proper location format, check for known locations
  const knownLocations = ['tokyo', 'paris', 'london', 'rome', 'bangkok', 'bali', 'sydney', 
                         'york', 'mexico', 'india', 'japan', 'china', 'thailand', 'europe'];
  
  for (const location of knownLocations) {
    if (query.toLowerCase().includes(location)) {
      return location.charAt(0).toUpperCase() + location.slice(1);
    }
  }
  
  return '';
};

/**
 * Validates if a query appears to be a valid location name
 */
export const isReasonableLocationQuery = (q: string): boolean => {
  // Must be at least 3 characters long
  if (q.length < 3) return false;
  
  // Should have a reasonable ratio of letters to other characters
  const letterCount = (q.match(/[a-zA-Z]/g) || []).length;
  if (letterCount < q.length * 0.6) return false;
  
  // Shouldn't have too many repeating characters (like "aaaaaaaa")
  const repeatedChars = q.match(/(.)\1{3,}/g); // 4+ repeated chars
  if (repeatedChars) return false;
  
  return true;
};
