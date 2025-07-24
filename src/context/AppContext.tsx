import { createContext } from "react";

interface AppContextType {
  //主题
  darkMode: boolean;
  toggleDarkMode: () => void;
  followSpeed: number;
  setFollowSpeed: (value: number) => void;
  ballOn: boolean;
  setBallOn: (value: boolean) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);
