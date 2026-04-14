import QRCode from "qrcode";
import { simulateRequest } from "./api.js";
import { ROUTES } from "../utils/constants.js";
import { buildEmergencyId, splitList } from "../utils/helpers.js";

function encodeBase64Url(value) {
  const utf8 = new TextEncoder().encode(value);
  let binary = "";

  utf8.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value) {
  const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  const paddingLength = (4 - (normalized.length % 4 || 4)) % 4;
  const padded = normalized + "=".repeat(paddingLength);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function buildSharedEmergencyPayload(profile, shareId) {
  return {
    shareId,
    fullName: profile?.fullName || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    bloodType: profile?.bloodType || "",
    allergies: splitList(profile?.allergies),
    conditions: splitList(profile?.conditions),
    medications: splitList(profile?.medications),
    doctor: profile?.doctor || "",
    doctorSpeciality: profile?.doctorSpeciality || "",
    doctorPhone: profile?.doctorPhone || "",
    emergencyContact: profile?.emergencyContact || "",
    notes: profile?.notes || "",
  };
}

export function encodeEmergencyData(profile, shareId) {
  return encodeBase64Url(JSON.stringify(buildSharedEmergencyPayload(profile, shareId)));
}

export function decodeEmergencyData(value) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(decodeBase64Url(value));
  } catch {
    return null;
  }
}

export function buildEmergencyUrl(shareId, profile) {
  if (typeof window === "undefined") {
    return `/emergency/${shareId}`;
  }

  const url = new URL(`/emergency/${shareId}`, window.location.origin);

  if (profile) {
    url.searchParams.set("data", encodeEmergencyData(profile, shareId));
  }

  return url.toString();
}

export async function getQRCodeData(profile) {
  return simulateRequest(() => {
    const shareId = profile?.emergencyId || buildEmergencyId(profile?.fullName);

    return {
      shareId,
      shareUrl: buildEmergencyUrl(shareId, profile),
      fullName: profile?.fullName,
      email: profile?.email,
      bloodType: profile?.bloodType,
      allergies: splitList(profile?.allergies),
      emergencyContact: profile?.emergencyContact,
    };
  });
}

export async function getEmergencyPreview(profile) {
  return simulateRequest(() => ({
    shareId: profile?.emergencyId || buildEmergencyId(profile?.fullName),
    identity: {
      fullName: profile?.fullName,
      email: profile?.email,
      bloodType: profile?.bloodType,
      phone: profile?.phone,
    },
    allergies: splitList(profile?.allergies),
    conditions: splitList(profile?.conditions),
    medications: splitList(profile?.medications),
    doctor: profile?.doctor,
    doctorSpeciality: profile?.doctorSpeciality,
    doctorPhone: profile?.doctorPhone,
    emergencyContact: profile?.emergencyContact,
    notes: profile?.notes,
  }));
}

export async function generateQRCodeImage(content) {
  return QRCode.toDataURL(content, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 520,
    color: {
      dark: "#111915",
      light: "#FFFFFF",
    },
  });
}

export function downloadQRCode(dataUrl, filename = "lifeline-qr.png") {
  if (typeof window === "undefined") {
    return;
  }

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

export function parseEmergencyQrNavigation(value) {
  const rawValue = String(value || "").trim();

  if (!rawValue) {
    return {
      shareId: "",
      route: "",
      rawValue: "",
    };
  }

  const fallbackBase =
    typeof window !== "undefined" ? window.location.origin : "https://lifeline.local";

  const directMatch = rawValue.match(/\/emergency\/([^/?#]+)/i);

  if (directMatch?.[1]) {
    const shareId = decodeURIComponent(directMatch[1]);
    let search = "";

    try {
      const url = new URL(rawValue, fallbackBase);
      search = url.search;
    } catch {
      const [, queryString = ""] = rawValue.split("?");
      search = queryString ? `?${queryString}` : "";
    }

    return {
      shareId,
      route: `${ROUTES.emergency}/${shareId}${search}`,
      rawValue,
    };
  }

  try {
    const url = new URL(rawValue, fallbackBase);
    const routePrefix = `${ROUTES.emergency}/`;

    if (url.pathname.startsWith(routePrefix)) {
      const shareId = decodeURIComponent(url.pathname.slice(routePrefix.length));

      return {
        shareId,
        route: `${ROUTES.emergency}/${shareId}${url.search}`,
        rawValue,
      };
    }
  } catch {
    if (/^[a-z0-9-]+$/i.test(rawValue)) {
      return {
        shareId: rawValue,
        route: `${ROUTES.emergency}/${rawValue}`,
        rawValue,
      };
    }

    return {
      shareId: "",
      route: "",
      rawValue,
    };
  }

  if (/^[a-z0-9-]+$/i.test(rawValue)) {
    return {
      shareId: rawValue,
      route: `${ROUTES.emergency}/${rawValue}`,
      rawValue,
    };
  }

  return {
    shareId: "",
    route: "",
    rawValue,
  };
}
