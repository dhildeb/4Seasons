import Link from "next/link";
import './seasons/autumn/autumn.scss';
import './seasons/spring/spring.scss';
import './seasons/winter/winter.scss';
import './seasons/summer/summer.scss';

export default function Home() {

  return (
    <div>
      <main> 
        <div className="flex-col">
            <Link className="spring-link" href="/seasons/spring">Spring</Link>
            <Link className="summer-link" href="/seasons/summer">Summer</Link>
            <Link className="autumn-link" href="/seasons/autumn">Autumn</Link>
            <Link className="winter-link" href="/seasons/winter">Winter</Link>
        </div>
      </main>
    </div>
  );
}