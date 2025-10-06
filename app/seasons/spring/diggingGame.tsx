
'use client';

import { useState, useRef } from "react";
import PlantModal from "./plantModal";
import { REWARDS, useSpringContext } from "../seasonsContext";

export type PlotState = {
  digging: boolean;
  progress: number;
  icon: string|null;
  canPlant: boolean;
  hardness: number;
  rewardClaimed: boolean;
};

const PLOT_COUNT = 2;
const SHOVEL_SPEED = 5; 

export default function DiggingGame() {
  const [plots, setPlots] = useState<PlotState[][]>(
    Array(PLOT_COUNT).fill(null).map(() =>
      Array(PLOT_COUNT).fill(null).map(() => ({
        digging: false,
        progress: 0,
        icon: null,
        canPlant: false,
        hardness: Math.floor(Math.random() * 3) + 5,
        rewardClaimed: false,
      }))
    )
  );
  const [isPlantModalOpen, setIsPlantModalOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<{row: number, col: number} | null>(null);

  const openPlantModal = (row: number, col: number) => {
    setSelectedPlot({row, col});
    setIsPlantModalOpen(true);
  };

  const closePlantModal = () => {
    setIsPlantModalOpen(false);
    setSelectedPlot(null);
  };
  const diggingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const {seeds, setSeeds} = useSpringContext();

  const handleReward = () => {
    const rewardChance = Math.random();
    if(rewardChance > 0.3) return;
    const rewardIndex = Math.floor(Math.random() * REWARDS.length);
    const reward = REWARDS[rewardIndex];
    alert(`You found a reward: ${reward.icon} (${reward.resource.name})`);
    setSeeds(prev => {
      const newSeeds = [...prev];
      const seedIdx = newSeeds.findIndex(s => s.id === reward.id);
      if(seedIdx !== -1) {
        newSeeds[seedIdx].qty += 1;
      } else {
        newSeeds.push({...reward, qty: 1});
      }
      return newSeeds;
    })
  }

  const handleMouseDown = (row: number, col: number) => {
    if(plots[row][col].canPlant) return;

    setPlots(prev => {
      const newPlots = [...prev];
      newPlots[row][col].digging = true;
      return newPlots;
    });
    if (diggingIntervalRef.current) return;
    const interval = setInterval(() => {
      let prizeClaimed = false
      setPlots(prev => {
        const newPlots = [...prev];
        newPlots[row][col].progress = SHOVEL_SPEED + prev[row][col].progress;
        if (newPlots[row][col].progress >= 100) {
          newPlots[row][col].digging = false;
          newPlots[row][col].canPlant = true;
        }
        return newPlots;
      });
      if (plots[row][col].progress >= 100) {
        clearInterval(interval);
        diggingIntervalRef.current = null;
          if(!prizeClaimed){
            handleReward();
            prizeClaimed = true;
          }
      }
    }, 1000);
    diggingIntervalRef.current = interval;
  }

  return (
    <div className="digging-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${PLOT_COUNT}, 120px)`, gridGap: '24px', justifyContent: 'center', alignItems: 'center', margin: '60px auto' }}>
      {/* Planting modal */}
      <PlantModal isOpen={isPlantModalOpen} onClose={closePlantModal} selectedPlot={selectedPlot} setPlots={setPlots} />
      {/* Garden  */}
      {plots.map((rowArr, row) =>
        rowArr.map((plot, col) => (
          <div
            key={`${row}-${col}`}
            className="dirt-plot"
            onMouseDown={() => {
              if (plots[row][col].icon) return
              handleMouseDown(row, col)}
            }
            onMouseUp={() => {
              if (plots[row][col].icon) return
              setPlots(prev => {
                const newPlots = [...prev];
                newPlots[row][col].digging = false;
                return newPlots;
              });
              if (diggingIntervalRef.current) {
                clearInterval(diggingIntervalRef.current);
                diggingIntervalRef.current = null;
              }
            }}
          >
            {plot.canPlant && (
              <button style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', fontSize: '1rem', padding: '4px 12px', borderRadius: '8px', background: '#81c784', color: '#fff', border: 'none' }}
                onClick={() => openPlantModal(row, col)}
              >Plant</button>
            )}
            {/* Progress bar while digging */}
            {plot.digging && (
              <div style={{ position: 'absolute', bottom: '16px', left: '10px', width: '100px', height: '18px', background: '#eee', borderRadius: '9px', overflow: 'hidden' }}>
                <div style={{ width: `${plot.progress}%`, height: '100%', background: '#a2d5f2', transition: 'width 0.2s' }}></div>
              </div>
            )}
            {/* icon after digging */}
            {plot.icon && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#333', fontWeight: 'bold', textAlign: 'center' }}>{plot.icon}</div>
            )}
          </div>
        ))
      )}
    </div>
  );
}