const { buildQrPayload } = require('../services/qrService');

exports.generateQR = async (req, res) => {
  return res.json({
    message: 'QR payload generated.',
    qr: buildQrPayload(req.params.id),
  });
};
