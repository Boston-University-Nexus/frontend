import React, { useEffect, useState } from "react";

import { FiCheck, FiX } from "react-icons/fi";

export default function Cookies() {
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (value === true) localStorage.setItem("bunexus_cookiesAccepted", "yes");
  }, [value]);

  useEffect(() => {
    if (localStorage.getItem("bunexus_cookiesAccepted") === "yes")
      setValue(false);
  }, []);

  if (value === null)
    return (
      <div
        className="fixed left-0 bottom-0 bg-white bg-opacity-90 w-full p-5 flex items-center justify-center gap-3"
        style={{ zIndex: 500 }}
      >
        <p style={{ maxWidth: "90%" }}>
          We use necessary cookies to keep you logged in to the site. We would
          also like to use optional cookies to track your usage.
        </p>
        <button
          className="border rounded-md py-2 px-3 border-gray-300 hover:bg-gray-200 hover:border-gray-400 hover:scale-105 transform transition-colors transition-transform focus:outline-none"
          onClick={() => setValue(true)}
        >
          <FiCheck />
        </button>
        <button
          className="border rounded-md py-2 px-3 border-gray-300 hover:bg-gray-200 hover:border-gray-400 hover:scale-105 transform transition-colors transition-transform focus:outline-none"
          onClick={() => setValue(false)}
        >
          <FiX />
        </button>
      </div>
    );
  return <></>;
}
