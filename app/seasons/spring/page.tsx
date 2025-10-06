import Link from 'next/link';
import './spring.scss';
import DiggingGame from './diggingGame';
import { SpringProvider } from '../seasonsContext';

export default function Spring() {
  const butterflyIndex = Math.floor(Math.random() * 8); // 0-7

    return (
    <div className="spring-bg">
      <div className="grass-bg"></div>
      <Link className="spring-link pl-8" href="/">Seasons</Link>
      <div className={`butterfly butterfly-${butterflyIndex}`}></div>
      <SpringProvider>
        <DiggingGame />
      </SpringProvider>
    </div>
    );
}