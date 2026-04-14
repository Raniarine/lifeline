export function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function getInitials(name = "LifeLine") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function nameFromEmail(email) {
  const fallback = "Utilisateur LifeLine";
  const safeEmail = email?.trim();

  if (!safeEmail || !safeEmail.includes("@")) {
    return fallback;
  }

  const localPart = safeEmail.split("@")[0];
  const cleaned = localPart
    .replace(/[._-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return cleaned || fallback;
}

export function splitList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value || "")
    .split(/[,;\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatList(value, fallback = "Non renseigne") {
  const items = splitList(value);
  return items.length ? items.join(", ") : fallback;
}

export function buildEmergencyId(name = "lifeline-user") {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .concat("-emergency");
}

export function firstName(name = "") {
  return name.split(" ").filter(Boolean)[0] || "Utilisateur";
}

export function buildQrMatrix(seed = "lifeline") {
  const source = Array.from(seed).reduce((total, char, index) => {
    return total + char.charCodeAt(0) * (index + 3);
  }, 41);

  return Array.from({ length: 13 }, (_, row) =>
    Array.from({ length: 13 }, (_, column) => {
      const anchorZone =
        (row < 3 && column < 3) ||
        (row < 3 && column > 9) ||
        (row > 9 && column < 3);

      if (anchorZone) {
        return true;
      }

      return ((row + 1) * (column + 3) + source) % 3 === 0;
    })
  );
}
