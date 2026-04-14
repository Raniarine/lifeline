import { simulateRequest } from "./api.js";
import { DEFAULT_PROFILE, STORAGE_KEYS } from "../utils/constants.js";
import { buildEmergencyId, nameFromEmail } from "../utils/helpers.js";

function readStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.authUser);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredUser(user) {
  if (typeof window === "undefined") {
    return user;
  }

  window.localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));
  return user;
}

function buildProfile(overrides = {}) {
  const fullName = overrides.fullName?.trim() || DEFAULT_PROFILE.fullName;
  const email = overrides.email?.trim() || DEFAULT_PROFILE.email;
  const phone = overrides.phone?.trim() || DEFAULT_PROFILE.phone;

  return {
    ...DEFAULT_PROFILE,
    ...overrides,
    fullName,
    email,
    phone,
    emergencyId: buildEmergencyId(fullName),
    emergencyContact:
      overrides.emergencyContact?.trim() ||
      `Contact principal - ${phone}`,
  };
}

export async function loginUser({ email, password }) {
  if (!email?.trim() || !password?.trim()) {
    throw new Error("Email and password are required.");
  }

  return simulateRequest(() => {
    const existingUser = readStoredUser();

    if (existingUser && existingUser.email?.toLowerCase() === email.trim().toLowerCase()) {
      return writeStoredUser({
        ...existingUser,
        lastLoginAt: new Date().toISOString(),
      });
    }

    return writeStoredUser(
      buildProfile({
        email: email.trim(),
        fullName: nameFromEmail(email),
        lastLoginAt: new Date().toISOString(),
      })
    );
  });
}

export async function registerUser(formValues) {
  const { fullName, email, phone, bloodType, password, confirmPassword } = formValues;

  if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !password?.trim()) {
    throw new Error("Please complete all required fields.");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  return simulateRequest(() =>
    writeStoredUser(
      buildProfile({
        fullName,
        email,
        phone,
        bloodType,
        lastLoginAt: new Date().toISOString(),
      })
    )
  );
}

export function getCurrentUser() {
  return readStoredUser();
}

export function logoutUser() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEYS.authUser);
}
