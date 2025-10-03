'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = window.localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-white/10"
      aria-label="Toggle dark mode"
      title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
    >
      <span aria-hidden>
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  );
}


