import { createContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { STORAGE_KEYS } from "../utils/constants.js";

const defaultAppState = {
  scannerPermission: false,
  lastScan: "",
};

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [appState, setAppState] = useLocalStorage(STORAGE_KEYS.appState, defaultAppState);

  function setScannerPermission(scannerPermission) {
    setAppState((current) => ({
      ...current,
      scannerPermission,
    }));
  }

  function saveLastScan(lastScan) {
    setAppState((current) => ({
      ...current,
      lastScan,
    }));
  }

  const value = useMemo(
    () => ({
      appState,
      setScannerPermission,
      saveLastScan,
    }),
    [appState]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
