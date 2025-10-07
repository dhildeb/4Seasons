'use client';

import { useEffect, useState } from 'react';
import './summer.scss';
import { useSummerContext } from '@/app/contexts/summerContext';
import Stars from './stars';
import { useSpringContext } from '@/app/contexts/springContext';

export default function Summer() {
    const [sunRays, setSunRays] = useState<{id: number, left: number}[]>([{id: 0, left: (Math.random() * 90) + 10}]);
    const {sunRays: collectedRays, setSunRays: setCollectedRays} = useSummerContext();
    const {plots, setPlots} = useSpringContext();

    useEffect(() => {
        const timer = setTimeout(() => {
            setSunRays(rays => [{ id: (rays[0]?.id ?? 0) + 1, left: (Math.random() * 90) + 10}, ...rays].slice(0, 5));
        }, Math.random() * 10000 + 10000);
        return () => clearTimeout(timer);
    }, [sunRays]);

    const collectRay = (id: number) => {
        setSunRays(rays => rays.filter(ray => ray.id !== id));
        setCollectedRays(collectedRays + 1);
    }

    const addSun = (row: number, col: number) => {
        if (plots[row][col].requiredRays <= plots[row][col].rays || collectedRays < 1) return
        setPlots(prev => {
            const newPlots = [...prev];
            newPlots[row][col].rays += 1;
            return newPlots;
        });
        setCollectedRays(collectedRays - 1)
    }

    return (
        <div className="summer-bg">
            <a className="summer-link pl-8" href="/">Seasons</a>
            <div>☀️: {collectedRays}</div>
            <div className="sun"></div>
            <div className="moon"></div>
            {/* plants */}
            <div className='garden flex justify-around'>
                {plots.map((rowArr, row) =>
                    rowArr.map((plot, col) => (
                    <div 
                        key={`${row}-${col}`}
                        className={plots[row][col].requiredRays <= plots[row][col].rays ? "plant plant-ready" : "plant"}
                        onClick={() => addSun(row, col)}
                        title={`${plots[row][col].rays}/${plots[row][col].requiredRays}`}
                    >
                        {plots[row][col].icon}
                    </div>
                    ))
                )}
            </div>
            <div className='ground'></div>
            <Stars />
            {/* game  */}
            <div>
                {sunRays.map(ray => (
                    <div 
                        className="sun-rays" 
                        onClick={() => collectRay(ray.id)} 
                        key={ray.id} 
                        style={{left: `${ray.left}%`}}
                    >☀️</div>
                ))}
            </div>
        </div>
    );
}