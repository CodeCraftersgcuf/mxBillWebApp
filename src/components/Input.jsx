const Input = ({ id, label, error, icon, type, ...props }) => {
  return (
    <div className="">
      {type === "checkbox" ? (
        <div className="flex items-center">
          <input type="checkbox" id={id} className="mr-2 bg-transparent" {...props} />
          <label htmlFor={id} className="text-black">
            {label}
          </label>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label
              htmlFor={id}
              className="block mb-1 text-sm font-medium"
            >
              {label}
            </label>
            <div className="flex items-center bg-zinc-300 rounded-lg">
              {icon && (
                <img
                  src={icon}
                  alt={`${label} icon`}
                  className="mr-2 py-2 ps-3"
                  width={35}
                />
              )}
              <input
                id={id}
                type={type}
                className="flex-1 focus:ring-0 bg-transparent text-black py-4 px-1 outline-none rounded-md"
                {...props}
                required
              />
            </div>
          </div>
        </>
      )}
      {error && <p className="text-error text-start text-sm">{error}</p>}
    </div>
  );
};

export default Input;
