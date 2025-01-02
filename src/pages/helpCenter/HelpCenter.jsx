import React from 'react';
import ChatCan from './components/ChatCan';
import SenderInput from './components/SenderInput';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_DOMAIN } from '../../apiConfig';

const HelpCenter = () => {
  const token = Cookies.get('authToken');

  // Fetch messages function
  const fetchMessages = async () => {
    const response = await axios.post(
      `${API_DOMAIN}/messages`,
      {}, // Empty request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data.map((msg) => ({
      type: msg.sender === 'user' ? 'sender' : 'receiver',
      text: msg.message,
      time: new Date(msg.created_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isImage: !!msg.attachment,
    }));
  };

  // Send message function
  const sendMessage = async (newMessage) => {
    const formData = new FormData();
    formData.append('message', newMessage.text);
    if (newMessage.isImage) {
      formData.append('attachment', newMessage.text);
    }
    await axios.post(`${API_DOMAIN}/send-message`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  // Fetch messages query
  const { data: messages = [], refetch, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    refetchInterval: 1000, // Poll every 1 second
  });

  // Send message mutation
  const { mutate: sendMessageMutation } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      refetch(); // Refetch messages on success
    },
  });

  const handleSendMessage = (newMessage) => {
    const optimisticMessage = {
      ...newMessage,
      type: 'sender',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Optimistically update messages
    sendMessageMutation(optimisticMessage);
  };

  return (
    <div className="p-4 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full relative">
        <h1 className="text-center text-white font-bold bg-theme-primary p-4 rounded w-fit mx-auto">
          Customer Service
        </h1>
        {isLoading ? (
          <p>Loading chat...</p>
        ) : (
          <>
            {/* Reverse messages array to display newest at the bottom */}
            <ChatCan messages={[...messages].reverse()} />
            <SenderInput onSendMessage={handleSendMessage} />
          </>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;
