"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThankYouContext = createContext();

export const ThankYouProvider = ({ children }) => {
  const [thankYouCopy, setThankYouCopy] = useState([]);

  // Load stored data from localStorage when the context mounts
  useEffect(() => {
    const storedData = localStorage.getItem("thankYouCopy");
    console.log("Loaded from storage:", storedData);
    
    if (storedData) {
      setThankYouCopy(JSON.parse(storedData));
    }
  }, []);

  // Function to update the array and store it in localStorage
  const updateThankYouCopy = (newArray) => {
    console.log("Updating context with:", newArray);
    setThankYouCopy(newArray);
    localStorage.setItem("thankYouCopy", JSON.stringify(newArray));
  };

  return (
    <ThankYouContext.Provider value={{ thankYouCopy, updateThankYouCopy }}>
      {children}
    </ThankYouContext.Provider>
  );
};

export const useThankYou = () => useContext(ThankYouContext);
