import { simulateRequest } from "./api.js";
import { DEFAULT_PROFILE, STORAGE_KEYS } from "../utils/constants.js";

function readStoredUser() {
  if (typeof window === "undefined") {
    return DEFAULT_PROFILE;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.authUser);
    return raw ? JSON.parse(raw) : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

function writeStoredUser(user) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));
  }

  return user;
}

export async function getProfile() {
  return simulateRequest(() => readStoredUser(), 120);
}

export async function updateProfile(updates) {
  return simulateRequest(() => {
    const currentUser = readStoredUser();
    const nextUser = {
      ...currentUser,
      ...updates,
    };

    return writeStoredUser(nextUser);
  }, 180);
}
