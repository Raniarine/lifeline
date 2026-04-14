const generateToken = require('../utils/generateToken');
const { requireFields } = require('../utils/validators');

exports.register = async (req, res) => {
  const missingFields = requireFields(req.body, ['fullName', 'email', 'password']);

  if (missingFields.length) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(', ')}`,
    });
  }

  const user = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone || '',
    emergencyId: `${req.body.fullName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  };

  return res.status(201).json({
    message: 'LifeLine account scaffold created.',
    token: generateToken(user.email),
    user,
  });
};

exports.login = async (req, res) => {
  const missingFields = requireFields(req.body, ['email', 'password']);

  if (missingFields.length) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(', ')}`,
    });
  }

  return res.json({
    message: 'Login request received.',
    token: generateToken(req.body.email),
    user: {
      email: req.body.email,
    },
  });
};
