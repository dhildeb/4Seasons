import Link from 'next/link';
import './autumn.scss';

export default function Autumn() {
    return (
        <div className="autumn-bg">
            <Link className="autumn-link pl-8" href="/">Seasons</Link>
            <div className="leaves">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className={`leaf leaf-${i}`}></div>
                ))}
            </div>
        </div>
    );
}