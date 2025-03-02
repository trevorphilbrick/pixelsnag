import { useState, useEffect } from "react";

export const useEnvVariable = (key: string) => {
  const [envValue, setEnvValue] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnvValue = async () => {
      try {
        const value = await window.electron.getEnv(key);
        setEnvValue(value);
      } catch (error) {
        console.error(`Error fetching env variable ${key}:`, error);
        setEnvValue(null);
      }
    };

    fetchEnvValue();
  }, [key]); // Re-run effect when key changes

  return envValue;
};
