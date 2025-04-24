import React from 'react';
import { ChatProvider } from './contexts/ChatContext';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';

function App() {
  return (
    <ChatProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <ChatContainer />
      </div>
    </ChatProvider>
  );
}

export default App;