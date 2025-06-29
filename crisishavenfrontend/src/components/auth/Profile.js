import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Shield, 
  Heart,
  Settings,
  LogOut,
  ArrowRight,
  Sparkles,
  Activity
} from 'lucide-react';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    emergencyContact: {
      name: user?.preferences?.emergencyContact?.name || '',
      phone: user?.preferences?.emergencyContact?.phone || '',
      relationship: user?.preferences?.emergencyContact?.relationship || ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('emergency.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updates = {
      name: formData.name,
      phone: formData.phone,
      preferences: {
        ...user?.preferences,
        emergencyContact: formData.emergencyContact
      }
    };

    const result = await updateProfile(updates);
    
    if (result.success) {
      setIsEditing(false);
    }
    
    setLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero mt-32 font-inter relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-20 w-32 h-32 bg-primary-500/20 rounded-full animate-float-3d"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-40 right-20 w-24 h-24 bg-secondary-500/20 rounded-full animate-rotate-3d"
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -30, 0], rotate: [0, 90, 180] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-accent-500/20 rounded-full animate-wave-3d"
        />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 0], x: [0, Math.sin(i) * 20, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            className="absolute w-2 h-2 bg-primary-500 rounded-full"
            style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: 180 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-2xl mb-6 transform-3d"
            >
              <User className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold text-gradient mb-4"
            >
              Your Profile
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Manage your account settings, personal information, and emergency contacts. 
              Your data is secure and confidential.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="card-3d p-8 relative overflow-hidden group"
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-primary px-6 py-3 flex items-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                  </motion.button>
                </div>

                {isEditing ? (
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-300 flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Full Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter your full name"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-300 flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        value={user?.email}
                        disabled
                        className="w-full px-4 py-3 bg-gray-800/30 border border-gray-600/30 rounded-xl text-gray-400 cursor-not-allowed backdrop-blur-sm"
                      />
                      <p className="text-xs text-gray-400">Email cannot be changed</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-300 flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter your phone number"
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full btn-primary py-3 px-6 rounded-xl font-semibold text-lg relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Save Changes</span>
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-xl">
                        <User className="w-5 h-5 text-primary-400" />
                        <div>
                          <label className="block text-sm font-medium text-gray-300">Name</label>
                          <p className="text-white font-medium">{user?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-xl">
                        <Mail className="w-5 h-5 text-primary-400" />
                        <div>
                          <label className="block text-sm font-medium text-gray-300">Email</label>
                          <p className="text-white font-medium">{user?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-xl">
                        <Phone className="w-5 h-5 text-primary-400" />
                        <div>
                          <label className="block text-sm font-medium text-gray-300">Phone</label>
                          <p className="text-white font-medium">{user?.phone || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-xl">
                        <Calendar className="w-5 h-5 text-primary-400" />
                        <div>
                          <label className="block text-sm font-medium text-gray-300">Member Since</label>
                          <p className="text-white font-medium">{formatDate(user?.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="card-3d p-8 relative overflow-hidden group"
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Emergency Contact</h2>
                </div>
                
                {isEditing ? (
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-300">Contact Name</label>
                      <input
                        type="text"
                        name="emergency.name"
                        value={formData.emergencyContact.name}
                        onChange={handleChange}
                        className="input-field w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter contact name"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-300">Contact Phone</label>
                      <input
                        type="tel"
                        name="emergency.phone"
                        value={formData.emergencyContact.phone}
                        onChange={handleChange}
                        className="input-field w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter contact phone"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-300">Relationship</label>
                      <input
                        type="text"
                        name="emergency.relationship"
                        value={formData.emergencyContact.relationship}
                        onChange={handleChange}
                        className="input-field w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 backdrop-blur-sm"
                        placeholder="e.g., Spouse, Parent, Friend"
                      />
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800/30 rounded-xl">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Contact Name</label>
                        <p className="text-white font-medium">
                          {user?.preferences?.emergencyContact?.name || 'Not set'}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-800/30 rounded-xl">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Contact Phone</label>
                        <p className="text-white font-medium">
                          {user?.preferences?.emergencyContact?.phone || 'Not set'}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-800/30 rounded-xl">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Relationship</label>
                        <p className="text-white font-medium">
                          {user?.preferences?.emergencyContact?.relationship || 'Not set'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            whileHover={{ scale: 1.02 }}
            className="card-3d p-8 relative overflow-hidden group"
          >
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Account Actions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/dashboard"
                    className="btn-primary px-6 py-4 flex items-center justify-center space-x-2 w-full"
                  >
                    <Activity className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/journal"
                    className="btn-secondary px-6 py-4 flex items-center justify-center space-x-2 w-full"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Journal</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/support"
                    className="btn-crisis px-6 py-4 flex items-center justify-center space-x-2 w-full"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Support</span>
                  </Link>
                </motion.div>
                <motion.button
                  onClick={logout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline px-6 py-4 flex items-center justify-center space-x-2 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 