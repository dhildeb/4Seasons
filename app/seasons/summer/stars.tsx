import { useState } from "react";

export default function Stars() {
    const [starIndex] = useState(Math.floor(Math.random() * 500));
    
    const [stars] = useState([...Array(starIndex)].map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
    })));

    return (
        <div className="stars">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                    top: star.top,
                    left: star.left,
                    }}
                />
            ))}
        </div>
    );
}