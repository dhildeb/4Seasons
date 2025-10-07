'use client';

import { PlotState, useSpringContext } from "../../contexts/springContext";

type PlantModalProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedPlot: {row: number, col: number} | null;
    setPlots: React.Dispatch<React.SetStateAction<PlotState[][]>>;
}

const PlantModal = ({isOpen, onClose, selectedPlot, setPlots}: PlantModalProps) => {
    const {seeds} = useSpringContext();

    return (
        <div className="plant-modal" style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', background: '#fff', border: '2px solid #333', borderRadius: '12px', padding: '16px', zIndex: 1000, display: isOpen ? 'flex' : 'none',  }}>
            <h3 style={{ marginBottom: '12px' }}>Select a seed to plant:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {seeds.map(seed => (
                <button key={seed.id} style={{ fontSize: '1.5rem', padding: '8px', borderRadius: '8px', background: '#f0f0f0', border: '1px solid #ccc', cursor: seed.qty > 0 ? 'pointer' : 'not-allowed', opacity: seed.qty > 0 ? 1 : 0.5 }}
                disabled={seed.qty <= 0}
                onClick={() => {
                    seed.qty -= 1;
                    if (selectedPlot) {
                    setPlots(prev => {
                        const newPlots = [...prev];
                        newPlots[selectedPlot.row][selectedPlot.col].canPlant = false;
                        newPlots[selectedPlot.row][selectedPlot.col].icon = seed.icon;
                        newPlots[selectedPlot.row][selectedPlot.col].requiredRays = seed.raysNeeded
                        return newPlots;
                    });
                    }
                    onClose();
                }}
                >
                {seed.icon} x{seed.qty}
                </button>
            ))}
            </div>
        </div>
    )

}

export default PlantModal