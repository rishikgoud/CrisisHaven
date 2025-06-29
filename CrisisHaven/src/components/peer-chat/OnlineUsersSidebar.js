import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import toast from 'react-hot-toast';

const OnlineUsersSidebar = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  // Mock data for demonstration
  useEffect(() => {
    setOnlineUsers([
      { id: 1, name: 'Alex', status: 'online', avatar: '😊', lastSeen: '2 min ago' },
      { id: 2, name: 'Sam', status: 'online', avatar: '🌟', lastSeen: '5 min ago' },
      { id: 3, name: 'Jordan', status: 'away', avatar: '🌙', lastSeen: '10 min ago' },
      { id: 4, name: 'Taylor', status: 'online', avatar: '💫', lastSeen: '1 min ago' },
    ]);
  }, []);

  const connectToPeer = (peerUser) => {
    setSelectedUser(peerUser);
    setConnectionStatus('connected');
    toast.success(`Connected to ${peerUser.name}!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'away': return 'text-yellow-400';
      case 'offline': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card-3d p-6 relative overflow-hidden group"
    >
      {/* Card glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 rounded-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Online Peers</h2>
        </div>

        <div className="space-y-3">
          {onlineUsers.map((user) => (
            <motion.div
              key={user.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                selectedUser?.id === user.id 
                  ? 'bg-primary-500/20 border border-primary-500/50' 
                  : 'bg-gray-800/30 hover:bg-gray-800/50'
              }`}
              onClick={() => connectToPeer(user)}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{user.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{user.name}</p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      user.status === 'online' ? 'bg-green-400' : 
                      user.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                    }`} />
                    <p className={`text-xs ${getStatusColor(user.status)}`}>
                      {user.status}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connection Status */}
        <div className="mt-6 p-4 bg-gray-800/30 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-400' : 'bg-gray-400'
            }`} />
            <span className="text-sm text-gray-300">
              {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          {selectedUser && (
            <p className="text-xs text-gray-400">
              Connected to: {selectedUser.name}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OnlineUsersSidebar; 