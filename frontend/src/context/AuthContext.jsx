import { createContext, startTransition, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService.js";
import { updateProfile as persistProfile } from "../services/profileService.js";
import { STORAGE_KEYS } from "../utils/constants.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [storedUser, setStoredUser] = useLocalStorage(STORAGE_KEYS.authUser, getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);

  async function login(formValues) {
    setIsLoading(true);

    try {
      const user = await loginUser(formValues);
      startTransition(() => {
        setStoredUser(user);
      });
      return user;
    } finally {
      setIsLoading(false);
    }
  }

  async function register(formValues) {
    setIsLoading(true);

    try {
      const user = await registerUser(formValues);
      startTransition(() => {
        setStoredUser(user);
      });
      return user;
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProfile(updates) {
    setIsLoading(true);

    try {
      const user = await persistProfile(updates);
      startTransition(() => {
        setStoredUser(user);
      });
      return user;
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    logoutUser();
    setStoredUser(null);
  }

  const value = useMemo(
    () => ({
      user: storedUser,
      isAuthenticated: Boolean(storedUser),
      isLoading,
      login,
      register,
      updateProfile,
      logout,
    }),
    [isLoading, storedUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
