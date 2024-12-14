import React from "react";

export default function Forminput({ name, label, placeholder, ...rest }) {
  return (
    <div className="flex flex-col-reverse">
      <input
        id={name}
        name={name}
        className="bg-transparent rounded border-2 border-dark-subtle  w-full
              outline-none focus:border-white p-1 text-white peer transition"
        placeholder={placeholder}
        {...rest}
      />
      <label
        className="font-semibold text-dark-subtle peer-focus:text-white transition self-start"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}
