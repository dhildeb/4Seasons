'use client';

import React, { createContext, useContext, useState } from "react";

const SEEDS = [
  {id: 1, raysNeeded: 5, icon: '🌱', resource: {name: 'food', qty: 1}, qty: 5}, 
  {id: 2, raysNeeded: 10, icon: '🌿', resource: {name: 'wood', qty: 1}, qty: 1},
  {id: 3, raysNeeded: 15, icon: '🍀', resource: {name: 'luck', qty: 1}, qty: 0},
  {id: 4, raysNeeded: 20, icon: '🌸', resource: {name: 'beauty', qty: 1}, qty: 0},
  {id: 5, raysNeeded: 25, icon: '🌻', resource: {name: 'sunshine', qty: 1}, qty: 0},
  {id: 6, raysNeeded: 30, icon: '🌼', resource: {name: 'happiness', qty: 1}, qty: 0},
  {id: 7, raysNeeded: 35, icon: '🌷', resource: {name: 'love', qty: 1}, qty: 0},
  {id: 8, raysNeeded: 40, icon: '🌹', resource: {name: 'passion', qty: 1}, qty: 0},
]

export const REWARDS = [
  {id: 1, raysNeeded: 5, icon: '🌱', resource: {name: 'food', qty: 1}, qty: 1}, 
  {id: 2, raysNeeded: 10, icon: '🌿', resource: {name: 'wood', qty: 1}, qty: 1},
  {id: 3, raysNeeded: 15, icon: '🍀', resource: {name: 'luck', qty: 1}, qty: 1},
  {id: 4, raysNeeded: 20, icon: '🌸', resource: {name: 'beauty', qty: 1}, qty: 1},
  {id: 5, raysNeeded: 25, icon: '🌻', resource: {name: 'sunshine', qty: 1}, qty: 1},
  {id: 6, raysNeeded: 30, icon: '🌼', resource: {name: 'happiness', qty: 1}, qty: 1},
  {id: 7, raysNeeded: 35, icon: '🌷', resource: {name: 'love', qty: 1}, qty: 1},
  {id: 8, raysNeeded: 40, icon: '🌹', resource: {name: 'passion', qty: 1}, qty: 1}
]

type Resource = {
  name: string;
  qty: number;
}

export type Seed = {
  id: number;
  raysNeeded: number; 
  icon: string; 
  resource: Resource; 
  qty: number;
};

export type PlotState = {
  digging: boolean;
  progress: number;
  icon: string|null;
  canPlant: boolean;
  hardness: number;
  rewardClaimed: boolean;
  rays: number;
  requiredRays: number;
};

interface SpringContextType {
  seeds: Seed[];
  setSeeds: React.Dispatch<React.SetStateAction<Seed[]>>;
  plotCount: number;
  setPlotCount: React.Dispatch<React.SetStateAction<number>>;
  plots: PlotState[][];
  setPlots: React.Dispatch<React.SetStateAction<PlotState[][]>>;
  shovelSpeed: number;
  setShovelSpeed: React.Dispatch<React.SetStateAction<number>>;
}

const SpringContext = createContext<SpringContextType | undefined>(undefined);

export const SpringProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seeds, setSeeds] = useState<Seed[]>(SEEDS);
  const [plotCount, setPlotCount] = useState(2);
  const [plots, setPlots] = useState<PlotState[][]>(
    Array(plotCount).fill(null).map(() =>
      Array(plotCount).fill(null).map(() => ({
        digging: false,
        progress: 0,
        icon: null,
        canPlant: false,
        hardness: Math.floor(Math.random() * 3) + 5,
        rewardClaimed: false,
        rays: 0,
        requiredRays: 0
      })
    ))
  );
  const [shovelSpeed, setShovelSpeed] = useState(5);

  return (
    <SpringContext.Provider value={{
      seeds,
      setSeeds,
      plotCount,
      setPlotCount,
      plots,
      setPlots,
      shovelSpeed,
      setShovelSpeed
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