import { useState } from "react";

function readValue(key, initialValue) {
  if (typeof window === "undefined") {
    return typeof initialValue === "function" ? initialValue() : initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);

    if (item !== null) {
      return JSON.parse(item);
    }
  } catch {
    return typeof initialValue === "function" ? initialValue() : initialValue;
  }

  return typeof initialValue === "function" ? initialValue() : initialValue;
}

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => readValue(key, initialValue));

  function setValue(value) {
    setStoredValue((currentValue) => {
      const nextValue = value instanceof Function ? value(currentValue) : value;

      if (typeof window !== "undefined") {
        if (nextValue === null || nextValue === undefined) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        }
      }

      return nextValue;
    });
  }

  return [storedValue, setValue];
}
