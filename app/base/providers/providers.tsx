"use client";

import { useEffect, useState } from "react";
import { UniversalProvider } from "../context/universalProvider";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
  }, []);

  return isLoaded ? (
    <UniversalProvider>
      {children}
      <Toaster />
    </UniversalProvider>
  ) : (
    <p />
  );
}
