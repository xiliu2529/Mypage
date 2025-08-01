import React, { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "../theme/theme";
import { AppContext } from "./AppContext";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 现有状态
  const [followSpeed, setFollowSpeed] = useState(0);
  const [ballOn, setBallOn] = useState(false);
  // 主题状态
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  // 根据 darkMode 创建主题
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);
  // 书签状态
  const [bookmarks, setBookmarks] = useState<{ name: string; url: string }[]>(
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider
        value={{
          followSpeed,
          setFollowSpeed,
          ballOn,
          setBallOn,
          darkMode,
          toggleDarkMode,
          bookmarks,
          setBookmarks,
        }}
      >
        {children}
      </AppContext.Provider>
    </ThemeProvider>
  );
};
