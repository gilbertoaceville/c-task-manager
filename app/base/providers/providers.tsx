"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import { UniversalProvider } from "../context/universalProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
  }, []);

  return isLoaded ? (
    <UniversalProvider fetchData>
      {children}
      <Toaster />
    </UniversalProvider>
  ) : (
    <span data-variant="center" className="loader" />
  );
}
