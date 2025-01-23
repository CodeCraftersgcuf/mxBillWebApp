import React, { useState, useRef, useEffect, useCallback } from "react";

const Options = ({
  type = "",
  icon = "",
  heading = "",
  options = [],
  value = "",
  editable = true,
  onChange = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search input
  const [filteredOptions, setFilteredOptions] = useState(options); // Filtered options based on search query
  const [dropdownOpen, setDropdownOpen] = useState(false); // Toggle for dropdown visibility
  const inputRef = useRef(null);

  // Debounced search logic to reduce the number of re-renders
  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  const filterOptions = useCallback(
    (query) => {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOptions(filtered);
    },
    [options]
  );

  const debouncedFilter = useRef(debounce(filterOptions, 300)).current;

  // Update filtered options when search query changes
  useEffect(() => {
    debouncedFilter(searchQuery);
  }, [searchQuery, debouncedFilter]);

  // Ensure the input reflects the value from the parent component
  useEffect(() => {
    if (inputRef.current && type !== "dropdown") {
      inputRef.current.value = value;
    }
  }, [value, type]);

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="p-4 bg-gray-200 rounded-lg flex items-center gap-4 text-2xl">
      {/* Icon */}
      {icon && <span>{icon}</span>}

      {/* Render dropdown or input inside the same box */}
      {type === "dropdown" ? (
        <div className="w-full max-w-full relative">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-lg bg-gray-200 text-black text-sm md:text-lg mb-2"
            onClick={toggleDropdown}
          />
          {/* Custom Dropdown */}
          {dropdownOpen && (
            <div className="absolute w-full max-h-60 overflow-y-auto bg-white border rounded-lg shadow-lg z-10">
              <div
                className="p-2 cursor-pointer hover:bg-gray-100 text-[12px] md:text-[18px]"
                onClick={() => {
                  onChange(""); // Clear selection
                  setDropdownOpen(false);
                }}
              >
                {heading || "Select an option"}
              </div>
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className={`p-2 cursor-pointer hover:bg-gray-100 text-[12px] md:text-[18px] ${
                    value === option ? "bg-gray-300" : ""
                  }`} // Highlight selected option
                  onClick={() => {
                    onChange(option); // Update the selected value
                    setDropdownOpen(false); // Close the dropdown after selection
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
          {/* Show selected value in input field */}
          <div
            className="w-full p-2 border rounded-lg bg-gray-200 text-black text-sm md:text-lg mb-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            {value || "Select an option"}
          </div>
        </div>
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
