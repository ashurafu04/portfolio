import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// The boot script in index.html sets data-theme on <html> before first paint,
// so the attribute is the single source of truth on the client.
const listeners = new Set();

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

// Prerendered HTML is theme-neutral: hydration runs as "light", then React
// re-renders with the real theme. Theme-specific visuals are switched by CSS
// (see ThemedImage) so they are already correct before hydration.
const getServerSnapshot = () => "light";

export const ThemeProvider = ({ children }) => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next = getSnapshot() === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Ignore write errors
    }
    listeners.forEach((listener) => listener());
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
