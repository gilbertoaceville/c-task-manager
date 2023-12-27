import { createContext, useContext, useState } from "react";
import themes from "./themes";

interface ContextProps {
  theme?: Record<string, string | any>;
}

export const UniversalContext = createContext<ContextProps>({ theme: {} });
export const UniversalUpdateContext = createContext(null);

export function UniversalProvider({ children }: { children: React.ReactNode }) {
  const [indexOfSelectedTheme, setIndexOfSelectedTheme] = useState(0);

  return (
    <UniversalContext.Provider
      value={{ theme: themes[indexOfSelectedTheme] }}
    >
      <UniversalUpdateContext.Provider value={{} as any}>
        {children}
      </UniversalUpdateContext.Provider>
    </UniversalContext.Provider>
  );
}

export const useUniversalContext = () => useContext(UniversalContext);
export const useUniversalUpdate = () => useContext(UniversalUpdateContext);
