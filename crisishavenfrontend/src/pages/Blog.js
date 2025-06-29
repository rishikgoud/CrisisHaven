import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Heart, 
  MessageCircle, 
  BookOpen,
  Sparkles,
  Tag,
  Eye,
  Phone,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [imageLoadStates, setImageLoadStates] = useState({});

  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [articlesRef, articlesInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const categories = [
    { id: 'all', name: 'All Articles', count: 24 },
    { id: 'crisis-support', name: 'Crisis Support', count: 8 },
    { id: 'mental-health', name: 'Mental Health', count: 6 },
    { id: 'wellness', name: 'Wellness', count: 5 },
    { id: 'community', name: 'Community', count: 3 },
    { id: 'research', name: 'Research', count: 2 },
  ];

  const articles = [
    {
      id: 1,
      title: 'Understanding Crisis: Signs, Symptoms, and When to Seek Help',
      excerpt: 'Learn to recognize the warning signs of a mental health crisis and understand when professional help is needed. This comprehensive guide covers everything from subtle changes to emergency situations.',
      category: 'crisis-support',
      author: 'Dr. Sarah Johnson',
      authorTitle: 'Clinical Psychologist',
      authorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80&fm=webp',
      date: '2024-01-15',
      readTime: '8 min read',
      views: 1247,
      likes: 89,
      comments: 23,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp',
      featured: true,
      contact: {
        phone: '+1-800-CRISIS',
        email: 'help@crisishaven.org',
        website: 'www.crisishaven.org/support'
      }
    },
    {
      id: 2,
      title: 'Building Resilience: Practical Strategies for Mental Wellness',
      excerpt: 'Discover evidence-based techniques to strengthen your mental resilience and navigate life\'s challenges with greater ease and confidence.',
      category: 'wellness',
      author: 'Dr. Michael Chen',
      authorTitle: 'Psychiatrist & Wellness Expert',
      authorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80&fm=webp',
      date: '2024-01-12',
      readTime: '12 min read',
      views: 892,
      likes: 67,
      comments: 18,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp',
      featured: false,
      contact: {
        phone: '+1-555-WELLNESS',
        email: 'wellness@crisishaven.org',
        website: 'www.crisishaven.org/wellness'
      }
    },
    {
      id: 3,
      title: 'The Power of Community Support in Mental Health Recovery',
      excerpt: 'How peer support groups and community connections can accelerate healing and provide lasting recovery through shared experiences and mutual understanding.',
      category: 'community',
      author: 'Maria Rodriguez',
      authorTitle: 'Peer Support Specialist',
      authorImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80&fm=webp',
      date: '2024-01-10',
      readTime: '6 min read',
      views: 654,
      likes: 45,
      comments: 12,
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp',
      featured: false,
      contact: {
        phone: '+1-555-COMMUNITY',
        email: 'community@crisishaven.org',
        website: 'www.crisishaven.org/community'
      }
    },
    {
      id: 4,
      title: 'Anxiety Management: Tools for Daily Coping',
      excerpt: 'Practical anxiety management techniques you can use anywhere, anytime to find calm and peace in moments of stress and worry.',
      category: 'mental-health',
      author: 'Dr. Emily Watson',
      authorTitle: 'Licensed Marriage & Family Therapist',
      authorImage: 'https://images.unsplash.com/photo-1594824475545-9d0c7c4951c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80&fm=webp',
      date: '2024-01-08',
      readTime: '10 min read',
      views: 1123,
      likes: 78,
      comments: 31,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp',
      featured: false,
      contact: {
        phone: '+1-555-ANXIETY',
        email: 'anxiety@crisishaven.org',
        website: 'www.crisishaven.org/anxiety'
      }
    },
    {
      id: 5,
      title: 'Depression and Hope: Stories of Recovery and Renewal',
      excerpt: 'Real stories from individuals who have overcome depression and found new meaning in life through treatment, support, and personal growth.',
      category: 'mental-health',
      author: 'Dr. James Wilson',
      authorTitle: 'Clinical Social Worker',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80&fm=webp',
      date: '2024-01-05',
      readTime: '15 min read',
      views: 1456,
      likes: 112,
      comments: 42,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp',
      featured: false,
      contact: {
        phone: '+1-555-DEPRESSION',
        email: 'depression@crisishaven.org',
        website: 'www.crisishaven.org/depression'
      }
    },
    {
      id: 6,
      title: 'Mindfulness and Meditation: A Beginner\'s Guide',
      excerpt: 'Start your mindfulness journey with simple meditation techniques that can transform your mental health and bring peace to your daily life.',
      category: 'wellness',
      author: 'Lisa Thompson',
      authorTitle: 'Mindfulness Coach',
      authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80&fm=webp',
      date: '2024-01-03',
      readTime: '7 min read',
      views: 789,
      likes: 56,
      comments: 19,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp',
      featured: false,
      contact: {
        phone: '+1-555-MINDFUL',
        email: 'mindfulness@crisishaven.org',
        website: 'www.crisishaven.org/mindfulness'
      }
    },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleContact = (contactInfo, type) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${contactInfo.phone}`);
        break;
      case 'email':
        window.open(`mailto:${contactInfo.email}`);
        break;
      case 'website':
        window.open(contactInfo.website, '_blank');
        break;
      default:
        break;
    }
  };

  // Image loading handlers
  const handleImageLoad = (imageId) => {
    setImageLoadStates(prev => ({ ...prev, [imageId]: 'loaded' }));
  };

  const handleImageError = (imageId) => {
    setImageLoadStates(prev => ({ ...prev, [imageId]: 'error' }));
  };

  // Image component with loading states
  const OptimizedImage = ({ src, alt, className, imageId }) => {
    const loadState = imageLoadStates[imageId] || 'loading';

    return (
      <div className={`relative ${className}`}>
        {loadState === 'loading' && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        )}
        {loadState === 'error' && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <ImageIcon className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm">Image unavailable</div>
            </div>
          </div>
        )}
        <img
          src={src}
          alt={alt}
          className={`${className} ${loadState === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => handleImageLoad(imageId)}
          onError={() => handleImageError(imageId)}
          loading="lazy"
        />
      </div>
    );
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
              x: [0, 60, 0],
              y: [0, -40, 0],
              rotate: [0, 120, 240]
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-1/4 w-28 h-28 bg-primary-500/20 rounded-full animate-float-3d"
          />
          <motion.div
            animate={{ 
              x: [0, -50, 0],
              y: [0, 50, 0],
              rotate: [0, -120, -240]
            }}
            transition={{ 
              duration: 22,
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
              <BookOpen className="w-4 h-4" />
              <span>Mental Health Resources</span>
            </div>

            <h1 className="text-responsive-2xl font-bold text-gray-100 leading-tight">
              Mental Health <span className="text-gradient">Resources</span>
            </h1>
            
            <p className="text-responsive-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Expert insights, practical advice, and inspiring stories to support your mental health journey. 
              Evidence-based articles written by mental health professionals and community members.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </motion.div>
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

      {/* Featured Article */}
      {filteredArticles.find(article => article.featured) && (
        <section className="py-12 bg-gradient-to-br from-primary-900/30 via-primary-800/20 to-secondary-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={articlesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-500/20 rounded-full text-primary-400 text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                <span>Featured Article</span>
              </div>
            </motion.div>

            {filteredArticles.filter(article => article.featured).map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={articlesInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card-3d overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-full">
                    <OptimizedImage
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      imageId={article.id.toString()}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center space-x-2 mb-4">
                      <Tag className="w-4 h-4 text-primary-500" />
                      <span className="text-primary-500 text-sm font-medium uppercase tracking-wider">
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-100 mb-4 leading-tight">
                      {article.title}
                    </h2>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{article.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{article.comments}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleContact(article.contact, 'phone')}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Contact</span>
                        </button>
                        <button 
                          onClick={() => handleContact(article.contact, 'website')}
                          className="btn-outline flex items-center space-x-2"
                        >
                          <span>Read More</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section 
        ref={articlesRef}
        className="py-20 bg-gradient-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.filter(article => !article.featured).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={articlesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card-3d overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    imageId={article.id.toString()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-primary-500/90 text-white text-xs font-medium rounded">
                      {categories.find(c => c.id === article.category)?.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-primary-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleContact(article.contact, 'phone')}
                        className="text-primary-500 hover:text-primary-400 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleContact(article.contact, 'website')}
                        className="text-primary-500 hover:text-primary-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-300 mb-2">No articles found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog; 