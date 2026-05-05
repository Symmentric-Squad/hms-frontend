import { Injectable } from '@angular/core';

export type ThemeName = 'light' | 'dark' | 'high-contrast' | string;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme: ThemeName = 'light';

  constructor() {
    // Initialize theme from localStorage or default
    const saved = localStorage.getItem('app-theme') as ThemeName | null;
    if (saved) this.applyTheme(saved);
  }

  // Apply a named theme. You can map names to Tailwind classes or CSS files.
  applyTheme(theme: ThemeName) {
    this.currentTheme = theme;
    localStorage.setItem('app-theme', theme);
    // Example: toggle classes on <html> or <body> for Tailwind
    const root = document.documentElement;
    // remove previous theme classes (adjust to your naming convention)
    root.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast');
    root.classList.add(`theme-${theme}`);
  }

  setTheme(theme: ThemeName) {
    this.applyTheme(theme);
  }

  toggleTheme() {
    if (this.currentTheme === 'light') this.setTheme('dark');
    else this.setTheme('light');
  }

  getTheme(): ThemeName {
    return this.currentTheme;
  }
}
