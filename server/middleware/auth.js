import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authenticateToken = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

      // Check if MongoDB is connected
      const isMongoConnected = () => {
        try {
          return User.db.readyState === 1;
        } catch (error) {
          return false;
        }
      };

      // Get user from token
      if (isMongoConnected()) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Use in-memory storage
        const user = User.findInMemoryUserById(decoded.id);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          req.user = userWithoutPassword;
        }
      }

      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'User not found'
        });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Not authorized to access this route, no token'
    });
  }
};

// Optional auth middleware for routes that can work with or without auth
const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      
      // Check if MongoDB is connected
      const isMongoConnected = () => {
        try {
          return User.db.readyState === 1;
        } catch (error) {
          return false;
        }
      };

      if (isMongoConnected()) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Use in-memory storage
        const user = User.findInMemoryUserById(decoded.id);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          req.user = userWithoutPassword;
        }
      }
    } catch (error) {
      // Don't throw error, just continue without user
      console.log('Optional auth failed:', error.message);
    }
  }

  next();
};

export { authenticateToken, optionalAuth }; 