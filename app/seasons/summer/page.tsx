'use client';

import { useEffect, useState } from 'react';
import './summer.scss';
import { useSummerContext } from '@/app/contexts/summerContext';

export default function Summer() {
    const [starIndex] = useState(Math.floor(Math.random() * 500));
    const [sunRays, setSunRays] = useState<{id: number, left: number}[]>([{id: 0, left: (Math.random() * 90) + 10}]);
    const {sunRays: collectedRays, setSunRays: setCollectedRays} = useSummerContext();

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

    return (
        <div className="summer-bg">
            <a className="summer-link pl-8" href="/">Seasons</a>
            <div>☀️: {collectedRays}</div>
            <div className="sun"></div>
            <div className="moon"></div>
            <div className="stars">
                {[...Array(starIndex)].map((_, i) => (
                <div
                    key={i}
                    className="star"
                    style={{
                    top: `${Math.random() * 100}vh`,
                    left: `${Math.random() * 100}vw`,
                    }}
                />
                ))}
            </div>
            {/* game  */}
            {sunRays.map(ray => (
                <div 
                    className="sun-rays" 
                    onClick={() => collectRay(ray.id)} 
                    key={ray.id} 
                    style={{left: `${ray.left}%`}}
                >☀️</div>
            ))}
        </div>
    );
}