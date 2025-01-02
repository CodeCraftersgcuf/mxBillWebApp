import React, { useEffect, useRef } from 'react';
import Reciver from './Reciver';
import Sender from './Sender';

const ChatCan = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-[60vh] overflow-auto bg-gray-50 my-4 p-2">
      <div className="flex flex-col gap-4">
        {messages.map((message, index) => {
          if (message.type === 'receiver') {
            return (
              <Reciver
                key={index}
                text={message.text}
                time={message.time}
                isImage={message.isImage}
              />
            );
          } else {
            return (
              <Sender
                key={index}
                text={message.text}
                time={message.time}
                isImage={message.isImage}
              />
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatCan;
