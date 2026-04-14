const { normalizeMedicalProfile } = require('../utils/validators');

exports.getEmergencyInfo = async (req, res) => {
  return res.json({
    shareId: req.params.id,
    profile: normalizeMedicalProfile({
      bloodType: 'O+',
      allergies: 'Penicilline',
      conditions: 'Asthme leger',
      medications: 'Ventoline',
      emergencyContact: 'Yassine - 06 12 34 56 78',
      doctor: 'Dr. Ali Benomar',
      notes: 'Demonstration payload for the LifeLine QR view.',
    }),
  });
};

exports.logEmergencyAccess = async (req, res) => {
  return res.status(201).json({
    message: 'Emergency access log received.',
    payload: {
      shareId: req.params.id,
      responder: req.body.responder || 'unknown',
      location: req.body.location || 'not provided',
    },
  });
};
