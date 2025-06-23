const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // Or import your global Prisma instance

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        console.error('JWT_SECRET is not defined for middleware. Please set it in your .env file.');
        // Do not send detailed error to client for security, log it server-side
        return res.status(401).json({ message: 'Not authorized, token verification failed (config issue)' });
      }
      const decoded = jwt.verify(token, jwtSecret);

      // Get user from the token's ID and attach to request object (excluding password)
      // This ensures the user still exists in the DB and is fresh
      const currentUser = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, email: true, name: true, createdAt: true, updatedAt: true }, // Select only non-sensitive fields
      });

      if (!currentUser) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      req.user = currentUser; // Attach user object to request
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Token verification error:', error.message);
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Not authorized, invalid token' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Not authorized, token expired' });
      }
      // For other errors, it might be a server issue
      return res.status(500).json({ message: 'Server error during token verification' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
