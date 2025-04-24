# TravelSafe AI Chat Bot

A modern AI-powered chat bot built with React and Vite that provides travel safety information and advice using Google's Gemini AI API.

## Features

- Clean, modern UI inspired by Apple design principles
- Integration with Google's Gemini AI API
- Travel safety-focused conversation capabilities
- Responsive design for all devices
- Message history with timestamps
- Loading states and typing indicators
- Error handling for API failures

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- A Gemini API key from Google AI Studio

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Development

The project structure is organized as follows:

- `/src/components`: UI components
- `/src/contexts`: React context for state management
- `/src/services`: API service for Gemini integration
- `/src/types`: TypeScript type definitions

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Google Gemini AI API
- Lucide React for icons

## License

MIT