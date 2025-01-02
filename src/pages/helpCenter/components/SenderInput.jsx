import React, { useState, useRef } from 'react';

const SenderInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      type: 'sender',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isImage: false,
    };

    onSendMessage(newMessage);
    setMessage('');
    resetTextareaHeight();
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    const newMessage = {
      type: 'sender',
      text: imageURL,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isImage: true,
    };

    onSendMessage(newMessage);
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const resetTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center w-full bg-gray-200 rounded px-4 shadow-lg relative">
        <textarea
          ref={textareaRef}
          placeholder="Enter your message..."
          className="flex-grow outline-none text-black placeholder-black resize-none bg-transparent p-4"
          value={message}
          onChange={handleInput}
          rows="1"
        />
        <label htmlFor="image-upload" className="ml-2 text-black text-2xl cursor-pointer">
          <i className="fa-regular fa-image"></i>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageSelect}
        />
      </div>
      <button
        className="ml-2 bg-black text-white p-2 text-2xl rounded-full flex items-center justify-center"
        onClick={handleSend}
      >
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  );
};

export default SenderInput;
