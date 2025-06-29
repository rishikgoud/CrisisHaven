import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// In-memory user store for development
const inMemoryUsers = new Map();

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  phone: {
    type: String,
    match: [/^\+?[\d\s-()]+$/, 'Please add a valid phone number']
  },
  preferences: {
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    },
    preferredContactMethod: {
      type: String,
      enum: ['web', 'phone', 'chat'],
      default: 'web'
    },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    },
    privacySettings: {
      shareData: { type: Boolean, default: false },
      anonymousMode: { type: Boolean, default: true }
    }
  },
  crisisHistory: [{
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['web_call', 'phone_call', 'chat'] },
    duration: Number,
    outcome: String,
    notes: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Add crisis session to history
UserSchema.methods.addCrisisSession = function(sessionData) {
  this.crisisHistory.push(sessionData);
  return this.save();
};

// In-memory user methods
const createInMemoryUser = async (userData) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  const user = {
    _id: Date.now().toString(),
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    lastLogin: new Date(),
    preferences: {
      emergencyContact: {},
      preferredContactMethod: 'web',
      notifications: { email: true, sms: false, push: true },
      privacySettings: { shareData: false, anonymousMode: true }
    },
    crisisHistory: [],
    isActive: true
  };
  
  inMemoryUsers.set(user._id, user);
  inMemoryUsers.set(user.email, user);
  return user;
};

const findInMemoryUserByEmail = (email) => {
  return inMemoryUsers.get(email);
};

const findInMemoryUserById = (id) => {
  return inMemoryUsers.get(id);
};

const updateInMemoryUser = (id, updates) => {
  const user = inMemoryUsers.get(id);
  if (user) {
    const updatedUser = { ...user, ...updates };
    inMemoryUsers.set(id, updatedUser);
    inMemoryUsers.set(updatedUser.email, updatedUser);
    return updatedUser;
  }
  return null;
};

// Static methods for in-memory operations
UserSchema.statics.createInMemoryUser = createInMemoryUser;
UserSchema.statics.findInMemoryUserByEmail = findInMemoryUserByEmail;
UserSchema.statics.findInMemoryUserById = findInMemoryUserById;
UserSchema.statics.updateInMemoryUser = updateInMemoryUser;

const User = mongoose.model('User', UserSchema);
export default User; 