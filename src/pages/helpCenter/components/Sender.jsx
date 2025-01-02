import React from 'react';

const Sender = ({ text, time, isImage }) => {
  return (
    <div className="flex justify-end">
      <div
        className="bg-theme-primary text-white p-2 rounded-lg max-w-[75%] md:max-w-[40%]"
        style={{ wordWrap: 'break-word' }}
      >
        {isImage ? (
          <img src={text} alt="Sent" className="rounded-lg w-full" />
        ) : (
          <h1>{text}</h1>
        )}
        <h1 className="text-end mt-4">{time}</h1>
      </div>
    </div>
  );
};

export default Sender;
