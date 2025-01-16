import React, { useRef, useEffect } from "react";

const Options = ({
  type = "",
  icon = "",
  heading = "",
  options = [],
  value = "",
  editable = true,
  onChange = () => {},
}) => {
  const inputRef = useRef(null);

  // console.log("options", options);

  // Ensure the input reflects the value from the parent component
  useEffect(() => {
    if (inputRef.current && type !== "dropdown") {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <div className="p-4 bg-gray-200 rounded-lg flex items-center gap-4 text-2xl">
      {/* Icon */}
      {icon && <span>{icon}</span>}

      {/* Render dropdown or input inside the same box */}
      {type === "dropdown" ? (
        <select
          className="w-full max-w-full overflow-x-auto p-2 border rounded-lg bg-gray-200 text-black md:text-lg text-sm"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled hidden>
            {heading || "Select an option"}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          ref={inputRef}
          type={heading === "Amount" ? "number" : "text"} // Number type for Amount
          placeholder={heading}
          className="flex-1 p-2 border rounded-lg bg-gray-200 text-black text-sm md:text-lg"
          readOnly={!editable} // Make non-editable if `editable` is false
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default Options;
