'use client';

import Link from 'next/link';
import './autumn.scss';
import { useState } from 'react';

export default function Autumn() {
    const [leafIndex] = useState(Math.floor(Math.random() * 50));

    return (
        <div className="autumn-bg">
            <Link className="autumn-link pl-8" href="/">Seasons</Link>
            <div className="leaves">
                {[...Array(leafIndex)].map((_, i) => (
                    <div key={i} className={`leaf leaf-${i}`}></div>
                ))}
            </div>
        </div>
    );
}