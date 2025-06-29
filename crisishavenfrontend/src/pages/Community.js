import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Search,
  Filter,
  Calendar,
  User,
  Eye,
  ArrowRight
} from 'lucide-react';

const Community = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [forumsRef, forumsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const categories = [
    { id: 'all', name: 'All Topics', count: 156 },
    { id: 'general', name: 'General Support', count: 45 },
    { id: 'anxiety', name: 'Anxiety & Stress', count: 32 },
    { id: 'depression', name: 'Depression', count: 28 },
    { id: 'recovery', name: 'Recovery Stories', count: 23 },
    { id: 'wellness', name: 'Wellness Tips', count: 18 },
    { id: 'crisis', name: 'Crisis Support', count: 10 },
  ];

  const forums = [
    {
      id: 1,
      title: 'How I overcame my anxiety with daily meditation',
      excerpt: 'I wanted to share my journey with anxiety and how meditation has completely transformed my life. It\'s been 6 months now and I feel like a different person...',
      category: 'anxiety',
      author: 'Sarah M.',
      date: '2024-01-15',
      replies: 23,
      views: 1247,
      likes: 89,
      isSticky: true,
      isLocked: false,
    },
    {
      id: 2,
      title: 'Support group for depression recovery - anyone interested?',
      excerpt: 'I\'m thinking of starting a weekly support group for people dealing with depression. We could meet virtually and share our experiences...',
      category: 'depression',
      author: 'Michael R.',
      date: '2024-01-14',
      replies: 15,
      views: 892,
      likes: 67,
      isSticky: false,
      isLocked: false,
    },
    {
      id: 3,
      title: 'My story: From rock bottom to finding hope',
      excerpt: 'I hit rock bottom last year and thought there was no way out. But with the help of this community and professional support, I\'m finally seeing light...',
      category: 'recovery',
      author: 'Emma L.',
      date: '2024-01-13',
      replies: 42,
      views: 2156,
      likes: 156,
      isSticky: true,
      isLocked: false,
    },
    {
      id: 4,
      title: 'Daily gratitude practice - what works for you?',
      excerpt: 'I\'ve been practicing daily gratitude for the past month and it\'s made such a difference. I\'d love to hear what gratitude practices work for others...',
      category: 'wellness',
      author: 'David K.',
      date: '2024-01-12',
      replies: 31,
      views: 1456,
      likes: 98,
      isSticky: false,
      isLocked: false,
    },
    {
      id: 5,
      title: 'Coping strategies for panic attacks',
      excerpt: 'I\'ve been experiencing panic attacks more frequently lately. What coping strategies have worked for you? I\'m looking for immediate relief techniques...',
      category: 'anxiety',
      author: 'Jennifer P.',
      date: '2024-01-11',
      replies: 28,
      views: 1123,
      likes: 76,
      isSticky: false,
      isLocked: false,
    },
    {
      id: 6,
      title: 'New to the community - hello everyone!',
      excerpt: 'Hi everyone! I\'m new here and just wanted to introduce myself. I\'ve been struggling with depression for a while and finally decided to reach out...',
      category: 'general',
      author: 'Alex T.',
      date: '2024-01-10',
      replies: 19,
      views: 789,
      likes: 45,
      isSticky: false,
      isLocked: false,
    },
  ];

  const supportGroups = [
    {
      id: 1,
      name: 'Anxiety Support Group',
      description: 'Weekly virtual meetings for people dealing with anxiety and panic disorders',
      members: 156,
      nextMeeting: '2024-01-20T19:00:00',
      category: 'anxiety',
      isActive: true,
    },
    {
      id: 2,
      name: 'Depression Recovery Circle',
      description: 'A safe space to share experiences and support each other through depression',
      members: 89,
      nextMeeting: '2024-01-22T20:00:00',
      category: 'depression',
      isActive: true,
    },
    {
      id: 3,
      name: 'Mindfulness & Wellness',
      description: 'Learn and practice mindfulness techniques together',
      members: 234,
      nextMeeting: '2024-01-18T18:00:00',
      category: 'wellness',
      isActive: true,
    },
  ];

  const filteredForums = forums.filter(forum => {
    const matchesSearch = forum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         forum.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || forum.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-20 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 40, 0],
              y: [0, -30, 0],
              rotate: [0, 90, 180]
            }}
            transition={{ 
              duration: 16,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-1/4 w-24 h-24 bg-primary-500/20 rounded-full animate-float-3d"
          />
          <motion.div
            animate={{ 
              x: [0, -60, 0],
              y: [0, 40, 0],
              rotate: [0, -90, -180]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-40 right-1/4 w-20 h-20 bg-secondary-500/20 rounded-full animate-rotate-3d"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-500 text-sm font-medium">
              <Users className="w-4 h-4" />
              <span>Peer Support Community</span>
            </div>

            <h1 className="text-responsive-2xl font-bold text-gray-100 leading-tight">
              Join Our <span className="text-gradient">Community</span>
            </h1>
            
            <p className="text-responsive-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with others who understand what you're going through. Share experiences, 
              find support, and build meaningful connections in a safe, moderated environment.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Groups Section */}
      <section className="py-16 bg-gradient-to-br from-secondary-900/30 via-secondary-800/20 to-accent-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-responsive-xl font-bold text-gray-100 mb-4">
              Support Groups
            </h2>
            <p className="text-responsive text-gray-300 max-w-2xl mx-auto">
              Join our virtual support groups and connect with others in a safe, moderated environment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="card-3d p-6 text-center"
              >
                <div className="w-16 h-16 bg-secondary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-3">{group.name}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{group.description}</p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{group.members} members</span>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-400">Next meeting:</p>
                  <p className="text-secondary-500 font-medium">
                    {formatDate(group.nextMeeting)} at {formatTime(group.nextMeeting)}
                  </p>
                </div>
                <button className="btn-secondary w-full">
                  Join Group
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories and Filters */}
      <section className="py-8 bg-gradient-dark border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Forums Section */}
      <section 
        ref={forumsRef}
        className="py-20 bg-gradient-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={forumsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-responsive-xl font-bold text-gray-100 mb-4">
              Community Discussions
            </h2>
            <p className="text-responsive text-gray-400 max-w-2xl mx-auto">
              Share your experiences, ask questions, and connect with others in our moderated forums
            </p>
          </motion.div>

          <div className="space-y-4">
            {filteredForums.map((forum, index) => (
              <motion.article
                key={forum.id}
                initial={{ opacity: 0, y: 20 }}
                animate={forumsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card-3d p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  {/* Forum Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-primary-500" />
                    </div>
                  </div>

                  {/* Forum Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      {forum.isSticky && (
                        <span className="px-2 py-1 bg-accent-500/20 text-accent-500 text-xs font-medium rounded">
                          Sticky
                        </span>
                      )}
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs font-medium rounded">
                        {categories.find(c => c.id === forum.category)?.name}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-primary-400 transition-colors">
                      {forum.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {forum.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{forum.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(forum.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{forum.replies} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{forum.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{forum.likes}</span>
                        </div>
                      </div>
                      
                      <button className="text-primary-500 hover:text-primary-400 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredForums.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-300 mb-2">No discussions found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}

          {/* Start New Discussion Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={forumsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12"
          >
            <button className="btn-primary text-responsive-lg px-8 py-4 inline-flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Start New Discussion</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Community; 