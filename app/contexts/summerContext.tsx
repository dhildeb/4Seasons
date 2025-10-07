'use client';

import React, { createContext, useContext, useState } from "react";


interface SummerContextType {
  sunRays: number;
  setSunRays: React.Dispatch<React.SetStateAction<number>>;
}

const SummerContext = createContext<SummerContextType | undefined>(undefined);

export const SummerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sunRays, setSunRays] = useState<number>(0);

  return (
    <SummerContext.Provider value={{
      sunRays,
      setSunRays
    }}>
      {children}
    </SummerContext.Provider>
  );
};

export const useSummerContext = () => {
  const context = useContext(SummerContext);
  if (!context) throw new Error("useSummerContext must be used within a SummerProvider");
  return context;
};