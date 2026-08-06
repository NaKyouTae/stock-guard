'use client';

import { useEffect, useState } from 'react';

type Theme = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'theme';

const OPTIONS: { value: Theme; label: string; icon: string }[] = [
  { value: 'system', label: '시스템', icon: '🖥️' },
  { value: 'light', label: '라이트', icon: '☀️' },
  { value: 'dark', label: '다크', icon: '🌙' },
];

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    setTheme(stored ?? 'system');
    setMounted(true);
  }, []);

  function select(next: Theme) {
    setTheme(next);
    if (next === 'system') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, next);
    }
    applyTheme(next);
  }

  return (
    <div
      role="radiogroup"
      aria-label="테마 설정"
      className="inline-flex items-center gap-1 rounded-full bg-surface p-1"
    >
      {OPTIONS.map((opt) => {
        const active = mounted && theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => select(opt.value)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-base transition-colors ${
              active
                ? 'bg-background shadow-sm'
                : 'opacity-50 hover:opacity-100'
            }`}
          >
            <span aria-hidden>{opt.icon}</span>
          </button>
        );
      })}
    </div>
  );
}
