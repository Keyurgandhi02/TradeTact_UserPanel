import React from "react";

function GlobalInput({
  inputType,
  placeholder,
  isValue,
  onChangeHandler,
  name,
  className,
  disabledStatus,
}) {
  const handleChange = (e) => {
    onChangeHandler(name, e.target.value);
  };

  return (
    <input
      className={className}
      type={inputType}
      placeholder={placeholder}
      value={isValue}
      name={name}
      onChange={handleChange}
      disabled={disabledStatus}
    />
  );
}

export default GlobalInput;
