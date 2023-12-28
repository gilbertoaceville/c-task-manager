import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import axios from "axios";

import themes from "./themes";

interface ContextProps {
  theme?: Record<string, string | any>;
}

export const UniversalContext = createContext<ContextProps>({ theme: {} });
export const UniversalUpdateContext = createContext(null);

const fetcher = (url: string) => fetch(url).then((r) => r.json());
export function UniversalProvider({ children }: { children: React.ReactNode }) {
  const [indexOfSelectedTheme, setIndexOfSelectedTheme] = useState(0);
  const [tasks, setTasks] = useState([]);
  // const [fetchData, setFetchData] = useState(false);

  // const { data, isLoading, error } = useSWR(
  //   fetchData ? "/api/tasks" : null,
  //   fetcher
  // );
  // const dataArray = isLoading ? [] : data;

  function getAllTasks() {
    const data = axios.get("/api/tasks");
  }


  return (
    <UniversalContext.Provider value={{ theme: themes[indexOfSelectedTheme] }}>
      <UniversalUpdateContext.Provider value={{ } as any}>
        {children}
      </UniversalUpdateContext.Provider>
    </UniversalContext.Provider>
  );
}

export const useUniversalContext = () => useContext(UniversalContext);
export const useUniversalUpdate = () => useContext(UniversalUpdateContext);
