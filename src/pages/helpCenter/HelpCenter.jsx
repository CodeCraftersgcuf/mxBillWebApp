import React, { useState } from 'react';
import ChatCan from './components/ChatCan';
import SenderInput from './components/SenderInput';

const HelpCenter = () => {
  const [messages, setMessages] = useState([
    { type: 'receiver', text: 'Hello! How can I help you today?', time: '11:50 PM', isImage: false },
  ]);

  const handleSendMessage = (newMessage) => {
    // Append the new message to the existing messages
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="p-4 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full relative">
        <h1 className="text-center text-white font-bold bg-theme-primary p-4 rounded w-fit mx-auto">
          Customer Service
        </h1>
        <ChatCan messages={messages} />
        <SenderInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default HelpCenter;
