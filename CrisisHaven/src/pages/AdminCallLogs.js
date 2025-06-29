import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Phone, 
  Video, 
  User, 
  Download,
  RefreshCw,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

// Native date formatting function to replace date-fns
const formatDate = (date, format = 'default') => {
  if (!date) return 'N/A';
  
  const d = new Date(date);
  
  switch (format) {
    case 'short':
      return d.toLocaleDateString();
    case 'time':
      return d.toLocaleTimeString();
    case 'datetime':
      return d.toLocaleString();
    case 'relative':
      const now = new Date();
      const diffMs = now - d;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} minutes ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      if (diffDays < 7) return `${diffDays} days ago`;
      return d.toLocaleDateString();
    default:
      return d.toLocaleString();
  }
};

const AdminCallLogs = () => {
  const [callLogs, setCallLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock data for demonstration
  const mockCallLogs = [
    {
      id: '1',
      sessionId: 'sess_12345',
      type: 'web',
      status: 'completed',
      userInfo: {
        name: 'Anonymous User',
        email: 'user@example.com',
        phone: '+1234567890'
      },
      counselor: 'Dr. Sarah Johnson',
      startTime: new Date(Date.now() - 3600000), // 1 hour ago
      endTime: new Date(Date.now() - 3000000), // 50 minutes ago
      duration: 600, // 10 minutes
      outcome: 'positive',
      notes: 'User reported feeling better after session. Recommended follow-up in 1 week.',
      emergency: false
    },
    {
      id: '2',
      sessionId: 'sess_67890',
      type: 'phone',
      status: 'active',
      userInfo: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1987654321'
      },
      counselor: 'Dr. Michael Chen',
      startTime: new Date(Date.now() - 1800000), // 30 minutes ago
      endTime: null,
      duration: 1800, // 30 minutes
      outcome: null,
      notes: 'Session in progress. User showing signs of improvement.',
      emergency: true
    },
    {
      id: '3',
      sessionId: 'sess_11111',
      type: 'web',
      status: 'failed',
      userInfo: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1555555555'
      },
      counselor: null,
      startTime: new Date(Date.now() - 7200000), // 2 hours ago
      endTime: new Date(Date.now() - 7200000),
      duration: 0,
      outcome: 'failed',
      notes: 'Connection failed due to technical issues. User was redirected to phone support.',
      emergency: false
    },
    {
      id: '4',
      sessionId: 'sess_22222',
      type: 'phone',
      status: 'completed',
      userInfo: {
        name: 'Anonymous User',
        email: '',
        phone: '+1777777777'
      },
      counselor: 'Dr. Emily Davis',
      startTime: new Date(Date.now() - 86400000), // 1 day ago
      endTime: new Date(Date.now() - 82800000), // 23 hours ago
      duration: 1800, // 30 minutes
      outcome: 'positive',
      notes: 'Successful crisis intervention. User provided with resources and follow-up plan.',
      emergency: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadCallLogs = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCallLogs(mockCallLogs);
      } catch (error) {
        console.error('Failed to load call logs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCallLogs();
  }, []);

  useEffect(() => {
    // Filter logs based on search and filters
    let filtered = callLogs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userInfo.phone.includes(searchTerm) ||
        (log.counselor && log.counselor.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(log => log.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(log => log.type === typeFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today.getTime() - 86400000);
      const weekAgo = new Date(today.getTime() - 7 * 86400000);

      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter(log => log.startTime >= today);
          break;
        case 'yesterday':
          filtered = filtered.filter(log => 
            log.startTime >= yesterday && log.startTime < today
          );
          break;
        case 'week':
          filtered = filtered.filter(log => log.startTime >= weekAgo);
          break;
        default:
          break;
      }
    }

    setFilteredLogs(filtered);
  }, [callLogs, searchTerm, statusFilter, typeFilter, dateFilter]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'completed': return 'text-blue-400 bg-blue-400/10';
      case 'failed': return 'text-red-400 bg-red-400/10';
      case 'ended': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'web' ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />;
  };

  const getOutcomeIcon = (outcome) => {
    switch (outcome) {
      case 'positive': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'negative': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'neutral': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default: return null;
    }
  };

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setShowDetails(true);
  };

  const handleDeleteLog = async (logId) => {
    if (window.confirm('Are you sure you want to delete this call log?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setCallLogs(prev => prev.filter(log => log.id !== logId));
        toast.success('Call log deleted successfully');
      } catch (error) {
        console.error('Failed to delete call log:', error);
        toast.error('Failed to delete call log');
      }
    }
  };

  const exportLogs = () => {
    const csvContent = [
      ['Session ID', 'Type', 'Status', 'User Name', 'Counselor', 'Start Time', 'Duration', 'Outcome', 'Emergency'],
      ...filteredLogs.map(log => [
        log.sessionId,
        log.type,
        log.status,
        log.userInfo.name,
        log.counselor || 'N/A',
        formatDate(log.startTime, 'datetime'),
        formatDuration(log.duration),
        log.outcome || 'N/A',
        log.emergency ? 'Yes' : 'No'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `call-logs-${formatDate(new Date(), 'datetime').replace(/[-:]/g, '').replace('T', '-').replace('Z', '')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const refreshLogs = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real implementation, this would fetch fresh data from the API
      toast.success('Call logs refreshed');
    } catch (error) {
      console.error('Failed to refresh logs:', error);
      toast.error('Failed to refresh logs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <div className="text-gray-400">Loading call logs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Call Logs</h1>
          <p className="text-gray-400">Monitor crisis support sessions</p>
        </div>

        {/* Filters and Actions */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={exportLogs}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary-400">{filteredLogs.length}</div>
            <div className="text-gray-400">Total Logs</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">
              {filteredLogs.filter(log => log.status === 'active').length}
            </div>
            <div className="text-gray-400">Active Sessions</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">
              {filteredLogs.filter(log => log.status === 'completed').length}
            </div>
            <div className="text-gray-400">Completed</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-400">
              {filteredLogs.filter(log => log.emergency).length}
            </div>
            <div className="text-gray-400">Emergency Calls</div>
          </div>
        </div>

        {/* Call Logs Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Session
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Counselor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredLogs.map((log) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-100">
                        {log.sessionId}
                      </div>
                      {log.emergency && (
                        <div className="text-xs text-red-400">Emergency</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(log.type)}
                        <span className="text-sm text-gray-300 capitalize">
                          {log.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-100">
                        {log.userInfo.name || 'Anonymous'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {log.userInfo.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {log.counselor || 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(log.startTime, 'relative')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDuration(log.duration)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(log)}
                          className="text-primary-400 hover:text-primary-300 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLog(log.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400">No call logs found</div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedLog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Call Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Session ID</label>
                  <div className="text-gray-100">{selectedLog.sessionId}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Type</label>
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(selectedLog.type)}
                    <span className="text-gray-100 capitalize">{selectedLog.type}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedLog.status)}`}>
                    {selectedLog.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Emergency</label>
                  <div className="text-gray-100">{selectedLog.emergency ? 'Yes' : 'No'}</div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">User Information</label>
                <div className="bg-gray-700 rounded-lg p-3 mt-1">
                  <div className="text-gray-100">Name: {selectedLog.userInfo.name || 'Anonymous'}</div>
                  <div className="text-gray-300">Email: {selectedLog.userInfo.email || 'Not provided'}</div>
                  <div className="text-gray-300">Phone: {selectedLog.userInfo.phone}</div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Session Information</label>
                <div className="bg-gray-700 rounded-lg p-3 mt-1">
                  <div className="text-gray-100">Counselor: {selectedLog.counselor || 'Unassigned'}</div>
                  <div className="text-gray-300">Start: {formatDate(selectedLog.startTime, 'datetime')}</div>
                  {selectedLog.endTime && (
                    <div className="text-gray-300">End: {formatDate(selectedLog.endTime, 'datetime')}</div>
                  )}
                  <div className="text-gray-300">Duration: {formatDuration(selectedLog.duration)}</div>
                  {selectedLog.outcome && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300">Outcome:</span>
                      {getOutcomeIcon(selectedLog.outcome)}
                      <span className="text-gray-100 capitalize">{selectedLog.outcome}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Notes</label>
                <div className="bg-gray-700 rounded-lg p-3 mt-1">
                  <div className="text-gray-100">{selectedLog.notes || 'No notes available'}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminCallLogs; 