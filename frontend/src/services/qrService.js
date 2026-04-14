import { simulateRequest } from "./api.js";
import { buildEmergencyId, splitList } from "../utils/helpers.js";

export async function getQRCodeData(profile) {
  return simulateRequest(() => ({
    shareId: profile?.emergencyId || buildEmergencyId(profile?.fullName),
    fullName: profile?.fullName,
    bloodType: profile?.bloodType,
    allergies: splitList(profile?.allergies),
    emergencyContact: profile?.emergencyContact,
  }));
}

export async function getEmergencyPreview(profile) {
  return simulateRequest(() => ({
    shareId: profile?.emergencyId || buildEmergencyId(profile?.fullName),
    identity: {
      fullName: profile?.fullName,
      bloodType: profile?.bloodType,
      phone: profile?.phone,
    },
    allergies: splitList(profile?.allergies),
    conditions: splitList(profile?.conditions),
    medications: splitList(profile?.medications),
    doctor: profile?.doctor,
    emergencyContact: profile?.emergencyContact,
    notes: profile?.notes,
  }));
}
