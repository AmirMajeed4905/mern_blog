import { createContext } from "react";

// Create ThemeContext
export const ThemeContext = createContext({
  theme: "light",      // default
  toggleTheme: () => {}, // placeholder function
});
