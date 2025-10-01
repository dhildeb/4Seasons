import './autumn.scss';

export default function Autumn() {
    return (
        <div className="autumn-bg">
            <a className="autumn-link pl-8" href="#">Autumn Page</a>
            <div className="leaves">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className={`leaf leaf-${i}`}></div>
                ))}
            </div>
        </div>
    );
}