'use client';

import Link from 'next/link';
import './spring.scss';
import DiggingGame from './diggingGame';
import { useSpringContext, REWARDS } from '../../contexts/springContext';
import { useEffect, useState } from 'react';

export default function Spring() {
  const [butterflyIndex, setButterflyIndex] = useState(0);
  const {setSeeds} = useSpringContext();
  const [butterflyRewarded, setButterflyRewarded] = useState<boolean>(false);

  useEffect(() => {
    setButterflyIndex(Math.floor(Math.random() * 8));
  }, []);

  const butterfly = () => {
        const rewardChance = Math.random();
        if(rewardChance > 0.1 || butterflyRewarded) return;
        const rewardIndex = Math.floor(Math.random() * REWARDS.length);
        const reward = REWARDS[rewardIndex];
        setButterflyRewarded(true);
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
    return (
    <div className="spring-bg">
      <div className="grass-bg"></div>
      <Link className="spring-link pl-8" href="/">Seasons</Link>
      <div className={`butterfly butterfly-${butterflyIndex}`} onClick={() => butterfly()}></div>
      <DiggingGame />
    </div>
    );
}