import React from 'react'

const Input = ({
  type, value, placeholder = '', setter,
}) => {
  return (
    <>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setter(e.target.value)}/>
    </>
  );
}

export default Input;
