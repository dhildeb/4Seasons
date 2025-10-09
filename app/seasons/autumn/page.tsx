'use client';

import Link from 'next/link';
import './autumn.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Autumn() {
    const [leafIndex] = useState(Math.floor(Math.random() * 50));
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    useEffect(() => {
        const health = async () => {
            const res = await api.get('/api/data?filter=active')
            console.log(res)
        }

        health()
    }, [])

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