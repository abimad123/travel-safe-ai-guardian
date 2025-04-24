const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent';

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export const generateResponse = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error('Gemini API key is not set. Please set VITE_GEMINI_API_KEY in your environment variables.');
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are TravelSafe AI, an assistant specializing in travel safety advice. 
                Provide helpful, accurate information about safety concerns, precautions, 
                and tips for travelers. If asked about topics unrelated to travel safety, 
                politely steer the conversation back to travel safety topics. 
                
                User query: ${prompt}`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API request failed: ${errorData}`);
    }

    const data = await response.json() as GeminiResponse;
    
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content.parts[0].text) {
      throw new Error('No response generated from the API');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};