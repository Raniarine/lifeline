exports.getUserProfile = async (req, res) => {
  return res.json({
    message: 'LifeLine user profile endpoint ready.',
    profile: {
      fullName: 'LifeLine Demo User',
      email: 'demo@lifeline.app',
      phone: '06 12 34 56 78',
      bloodType: 'O+',
    },
  });
};

exports.updateUserProfile = async (req, res) => {
  return res.json({
    message: 'Profile update scaffold ready.',
    updates: req.body,
  });
};
