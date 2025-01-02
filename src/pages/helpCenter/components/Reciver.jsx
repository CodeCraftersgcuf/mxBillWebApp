import React from 'react';

const Reciver = ({ text, time, isImage }) => {
  return (
    <div className="flex justify-start">
      <div
        className="bg-theme-primary text-white p-2 rounded-lg max-w-[75%] md:max-w-[40%]"
        style={{ wordWrap: 'break-word' }} // Ensure long text wraps
      >
        {isImage ? (
          <img src={text} alt="Received" className="rounded-lg w-full" />
        ) : (
          <h1>{text}</h1>
        )}
        <h1 className="text-end mt-4">{time}</h1>
      </div>
    </div>
  );
};

export default Reciver;
