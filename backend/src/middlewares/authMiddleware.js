module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || '';

  if (authHeader.startsWith('Bearer ')) {
    req.user = {
      token: authHeader.replace('Bearer ', ''),
    };
  }

  next();
};
