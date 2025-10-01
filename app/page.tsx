import Link from "next/link";

export default function Home() {

  return (
    <div className="">
      <main className="">
        
        <div className="">
            <Link href="/seasons/spring">Spring</Link>
            <Link href="/seasons/summer">Summer</Link>
            <Link href="/seasons/autumn">Autumn</Link>
            <Link href="/seasons/winter">Winter</Link>
        </div>
      </main>
      <footer className="">

      </footer>
    </div>
  );
}