'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [open, setOpen] = useState(false);

  const navigation = [
    { name: 'All Posts', href: '/blog' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-2xl font-semibold italic text-gray-900">
            Ash.
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link href="/blog" className="text-base font-semibold text-gray-900 hover:line-through">Portfolio</Link>
            <Link href="/about" className="text-base font-semibold text-gray-900">About</Link>
            <ThemeToggle />
          </nav>
          <button className="sm:hidden text-sm text-gray-600" onClick={() => setOpen(!open)} aria-label="Toggle Menu">
            Menu
          </button>
        </div>
        {open ? (
          <div className="sm:hidden pb-3">
            <div className="flex flex-col gap-3 pt-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="text-sm text-gray-600" onClick={() => setOpen(false)}>
                  {item.name}
                </Link>
              ))}
              <ThemeToggle />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
