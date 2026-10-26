import useTheme from '../../hooks/useTheme';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className={`theme-toggle ${isDark ? 'is-dark' : 'is-light'}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className="theme-toggle__icon theme-toggle__icon--moon">
        <MoonIcon />
      </span>
      <span className="theme-toggle__icon theme-toggle__icon--sun">
        <SunIcon />
      </span>
    </button>
  );
}
