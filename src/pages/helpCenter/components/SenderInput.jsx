import React, { useState, useRef } from 'react';

const SenderInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (message.trim() === '') return;

    const newMessage = {
      type: 'sender',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isImage: false,
    };

    // Send the message
    onSendMessage(newMessage);
    setMessage('');
    resetTextareaHeight();

    // Simulate a dummy response
    setTimeout(() => {
      onSendMessage({
        type: 'receiver',
        text: 'Thanks for your message! We will get back to you shortly.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isImage: false,
      });
    }, 1000);
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

    // Send the image
    onSendMessage(newMessage);

    // Simulate a dummy response for the image
    setTimeout(() => {
      onSendMessage({
        type: 'receiver',
        text: 'We received your image. Thank you!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isImage: false,
      });
    }, 1000);
  };

  const handleInput = (e) => {
    setMessage(e.target.value);

    // Adjust the height of the textarea
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content
  };

  const resetTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; // Reset to the default height
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center w-full bg-gray-200 rounded px-4 shadow-lg relative overflow-hidden">
        <textarea
          ref={textareaRef}
          placeholder="Enter your message..."
          className="flex-grow outline-none text-black placeholder-black resize-none bg-transparent overflow-hidden p-4"
          value={message}
          onChange={handleInput}
          rows="1" // Initial rows
          style={{
            maxHeight: '200px',
          }}
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
        {/* Placeholder Styling for Center Alignment */}
        {/* {!message && (
          <div
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            style={{ fontSize: '14px' }}
          >
            Enter your message...
          </div>
        )} */}
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
