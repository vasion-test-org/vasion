"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThankYouContext = createContext();

export const ThankYouProvider = ({ children }) => {
  const [thankYouCopy, setThankYouCopy] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("thankYouCopy");
    // console.log("Loaded from storage:", storedData);
    
    if (storedData) {
      setThankYouCopy(JSON.parse(storedData));
    }
  }, []);

  const updateThankYouCopy = (newArray) => {
    // console.log("Updating context with:", newArray);
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
