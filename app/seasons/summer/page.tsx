import './summer.scss';

export default function Summer() {
    const starIndex = Math.floor(Math.random() * 500);
    
    return (
        <div className="summer-bg">
            <a className="summer-link pl-8" href="/">Seasons</a>
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
        </div>
    );
}