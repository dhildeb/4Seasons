'use client';

import React, { createContext, useContext, useState } from "react";

const SEEDS = [
    {id: 1, time: 5, icon: '🌱', resource: {name: 'food', qty: 1}, qty: 5}, 
    {id: 2, time: 10, icon: '🌿', resource: {name: 'wood', qty: 1}, qty: 1},
    {id: 3, time: 15, icon: '🍀', resource: {name: 'luck', qty: 1}, qty: 0},
    {id: 4, time: 20, icon: '🌸', resource: {name: 'beauty', qty: 1}, qty: 0},
    {id: 5, time: 25, icon: '🌻', resource: {name: 'sunshine', qty: 1}, qty: 0},
    {id: 6, time: 30, icon: '🌼', resource: {name: 'happiness', qty: 1}, qty: 0},
    {id: 7, time: 35, icon: '🌷', resource: {name: 'love', qty: 1}, qty: 0},
    {id: 8, time: 40, icon: '🌹', resource: {name: 'passion', qty: 1}, qty: 0},
]

export const REWARDS = [
    {id: 1, time: 5, icon: '🌱', resource: {name: 'food', qty: 1}, qty: 1}, 
    {id: 2, time: 10, icon: '🌿', resource: {name: 'wood', qty: 1}, qty: 1},
    {id: 3, time: 15, icon: '🍀', resource: {name: 'luck', qty: 1}, qty: 1},
    {id: 4, time: 20, icon: '🌸', resource: {name: 'beauty', qty: 1}, qty: 1},
    {id: 5, time: 25, icon: '🌻', resource: {name: 'sunshine', qty: 1}, qty: 1},
    {id: 6, time: 30, icon: '🌼', resource: {name: 'happiness', qty: 1}, qty: 1},
    {id: 7, time: 35, icon: '🌷', resource: {name: 'love', qty: 1}, qty: 1},
    {id: 8, time: 40, icon: '🌹', resource: {name: 'passion', qty: 1}, qty: 1},]

type Resource = {
    name: string;
    qty: number;
}

export type Seed = {
    id: number;
    time: number; 
    icon: string; 
    resource: Resource; 
    qty: number;
};

interface SpringContextType {
    seeds: Seed[];
    setSeeds: React.Dispatch<React.SetStateAction<Seed[]>>;
}

const SpringContext = createContext<SpringContextType | undefined>(undefined);

export const SpringProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [seeds, setSeeds] = useState<Seed[]>(SEEDS);


  return (
    <SpringContext.Provider value={{
        seeds,
        setSeeds,
    }}>
      {children}
    </SpringContext.Provider>
  );
};

export const useSpringContext = () => {
  const context = useContext(SpringContext);
  if (!context) throw new Error("useSpringContext must be used within a SpringProvider");
  return context;
};