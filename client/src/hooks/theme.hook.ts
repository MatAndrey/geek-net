import { useLayoutEffect, useState } from "react";

const isDarkTheme = window.matchMedia("(prefers-color-theme: dark)").matches;
const defaultTheme = isDarkTheme ? "dark" : "light";

export const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("color-theme") || defaultTheme);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("color-theme", theme);
  }, [theme]);

  return { theme, setTheme };
};
