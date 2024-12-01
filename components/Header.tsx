'use client'
import Link from "next/link";
import Logout from './Logout';


export default function Header() {
  return (
    <>
    <section className="container">
      <header className="header flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <Link href="/">NextPen</Link>
        </h1>
        <ul className="nav">
          <li><Logout /></li>
          <li><Link href="/articles">Articles</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
        
      </header>
    </section>
    </>
  );
}
