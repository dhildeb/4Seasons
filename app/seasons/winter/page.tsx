import Link from "next/link";
import './winter.scss';

export default function Winter() {
    const blizzardIndex = Math.floor(Math.random() * 300);
    return (
        <div className="winter-bg">
            <Link className="winter-link pl-8" href="/">Seasons</Link>
            <div className="snowflakes">
                {[...Array(blizzardIndex)].map((_, i) => (
                    <div key={i} className={`snowflake snowflake-${i}`}></div>
                ))}
            </div>
        </div>
    );
}