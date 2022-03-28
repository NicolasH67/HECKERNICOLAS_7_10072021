const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = JWT.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(decodedToken)
    const userId = decodedToken.userId;
    if (req.body.userId && userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};