import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Check if MongoDB is connected
const isMongoConnected = () => {
  try {
    return User.db.readyState === 1;
  } catch (error) {
    return false;
  }
};

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    let user;
    
    if (isMongoConnected()) {
      user = await User.findById(req.user.id);
    } else {
      user = User.findInMemoryUserById(req.user.id);
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get profile'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update current user profile
// @access  Private
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, phone, preferences } = req.body;
    
    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone !== undefined) updateFields.phone = phone;
    if (preferences) updateFields.preferences = preferences;

    let user;
    
    if (isMongoConnected()) {
      user = await User.findByIdAndUpdate(
        req.user.id,
        updateFields,
        { new: true, runValidators: true }
      );
    } else {
      user = User.updateInMemoryUser(req.user.id, updateFields);
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile'
    });
  }
});

// @route   GET /api/users/crisis-history
// @desc    Get user's crisis history
// @access  Private
router.get('/crisis-history', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: user.crisisHistory
    });
  } catch (error) {
    console.error('Get crisis history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get crisis history',
      message: error.message
    });
  }
});

export default router; 