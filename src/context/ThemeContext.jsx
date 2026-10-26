import { createContext, useCallback, useEffect, useState } from 'react';

export const ThemeContext = createContext(null);

const readStoredTheme = () => {
  try {
    const stored = localStorage.getItem('zn-theme');
    return stored === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('zn-theme', theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
