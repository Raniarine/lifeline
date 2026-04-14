function requireFields(payload = {}, fields = []) {
  return fields.filter((field) => !payload[field]);
}

function splitCsv(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return String(value || '')
    .split(/[,;\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeMedicalProfile(payload = {}) {
  return {
    bloodType: payload.bloodType || payload.bloodGroup || 'Unknown',
    allergies: splitCsv(payload.allergies),
    conditions: splitCsv(payload.conditions || payload.chronicDiseases),
    medications: splitCsv(payload.medications),
    emergencyContact: payload.emergencyContact || '',
    doctor: payload.doctor || '',
    notes: payload.notes || payload.medicalNotes || '',
  };
}

module.exports = {
  requireFields,
  splitCsv,
  normalizeMedicalProfile,
};
