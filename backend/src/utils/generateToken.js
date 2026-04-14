module.exports = function generateToken(seed = 'lifeline') {
  return Buffer.from(`${seed}:${Date.now()}`).toString('base64url');
};
