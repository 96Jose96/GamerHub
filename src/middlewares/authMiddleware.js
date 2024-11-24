const admin = require('../config/fireBaseAdmin.js')

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.startsWith('Bearer') ? authHeader.split('')[1] : null

    if (!token) return res.status(403).send("Token required");

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken
    next();
  } catch (error) {
    res.status(403).json({ message: 'Unauthorized' });
  }
}

module.exports = verifyToken