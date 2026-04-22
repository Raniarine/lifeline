const mongoose = require('mongoose');

const READY_STATE_LABELS = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

module.exports = (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  return res.status(503).json({
    message:
      'La base de donnees LifeLine est indisponible. Verifiez la connexion MongoDB du backend puis redemarrez le serveur.',
    code: 'DATABASE_UNAVAILABLE',
    state: READY_STATE_LABELS[mongoose.connection.readyState] || 'unknown',
  });
};
