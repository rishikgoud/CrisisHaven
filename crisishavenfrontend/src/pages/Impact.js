import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Heart, 
  Clock, 
  Globe,
  Sparkles,
  ArrowRight,
  Award,
  Target,
  CheckCircle,
  Star,
  Activity,
  Zap,
  Image as ImageIcon
} from 'lucide-react';

const Impact = () => {
  const [imageLoadStates, setImageLoadStates] = useState({});

  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [storiesRef, storiesInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const stats = [
    {
      icon: Users,
      value: '50,000+',
      label: 'People Helped',
      description: 'Individuals who found support through our platform',
      change: '+15%',
      trend: 'up',
    },
    {
      icon: Heart,
      value: '95%',
      label: 'Satisfaction Rate',
      description: 'Users report feeling better after using our services',
      change: '+3%',
      trend: 'up',
    },
    {
      icon: Clock,
      value: '< 30s',
      label: 'Average Response Time',
      description: 'Time to connect with support when needed',
      change: '-20%',
      trend: 'down',
    },
    {
      icon: Globe,
      value: '150+',
      label: 'Countries Reached',
      description: 'Global impact across different communities',
      change: '+12',
      trend: 'up',
    },
  ];

  const impactMetrics = [
    {
      category: 'Crisis Prevention',
      metrics: [
        { name: 'Crisis Calls Prevented', value: '2,847', change: '+23%' },
        { name: 'Emergency Interventions', value: '156', change: '+8%' },
        { name: 'Safety Plans Created', value: '8,923', change: '+31%' },
      ],
    },
    {
      category: 'Mental Health Support',
      metrics: [
        { name: 'Therapy Sessions', value: '45,231', change: '+18%' },
        { name: 'Support Group Sessions', value: '12,456', change: '+25%' },
        { name: 'Wellness Resources Accessed', value: '89,234', change: '+42%' },
      ],
    },
    {
      category: 'Community Impact',
      metrics: [
        { name: 'Peer Support Connections', value: '67,891', change: '+35%' },
        { name: 'Educational Resources Shared', value: '234,567', change: '+28%' },
        { name: 'Volunteer Hours', value: '45,678', change: '+19%' },
      ],
    },
  ];

  const successStories = [
    {
      id: 1,
      name: 'Sarah M.',
      age: 28,
      location: 'New York, NY',
      story: 'I was at my lowest point when I found CrisisHaven. The AI companion helped me through my darkest moments, and the community gave me hope. Today, I\'m thriving and helping others.',
      improvement: 'Depression recovery',
      timeFrame: '6 months',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&fm=webp',
    },
    {
      id: 2,
      name: 'Michael R.',
      age: 35,
      location: 'Los Angeles, CA',
      story: 'The crisis support team literally saved my life. They were there when I needed them most, and the follow-up care helped me build a sustainable recovery plan.',
      improvement: 'Crisis intervention',
      timeFrame: '3 months',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&fm=webp',
    },
    {
      id: 3,
      name: 'Emma L.',
      age: 24,
      location: 'Chicago, IL',
      story: 'Anxiety was controlling my life until I discovered the mindfulness resources here. The daily practices and community support have transformed my mental health.',
      improvement: 'Anxiety management',
      timeFrame: '8 months',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&fm=webp',
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Mental Health Innovation Award',
      description: 'Recognized for breakthrough AI-powered crisis support',
      year: '2024',
    },
    {
      icon: Target,
      title: 'Zero Suicide Initiative Partner',
      description: 'Official partner in national suicide prevention efforts',
      year: '2023',
    },
    {
      icon: Star,
      title: 'Community Impact Excellence',
      description: 'Awarded for exceptional community mental health support',
      year: '2023',
    },
  ];

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
              x: [0, 50, 0],
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
              x: [0, -60, 0],
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
              <BarChart3 className="w-4 h-4" />
              <span>Our Impact</span>
            </div>

            <h1 className="text-responsive-2xl font-bold text-gray-100 leading-tight">
              Making a <span className="text-gradient">Real Impact</span>
            </h1>
            
            <p className="text-responsive-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              See how CrisisHaven is transforming mental health support worldwide. 
              Every number represents a life touched, a crisis averted, and hope restored.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Statistics */}
      <section 
        ref={statsRef}
        className="py-20 bg-gradient-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-responsive-xl font-bold text-gray-100 mb-4">
              Key Statistics
            </h2>
            <p className="text-responsive text-gray-400 max-w-2xl mx-auto">
              Real numbers that show our commitment to mental health support and crisis prevention
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="card-3d p-6 text-center group"
                >
                  <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-100 mb-2">{stat.value}</div>
                  <h3 className="text-lg font-bold text-gray-100 mb-2">{stat.label}</h3>
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed">{stat.description}</p>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    stat.trend === 'up' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                    <span>{stat.change}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 bg-gradient-to-br from-secondary-900/30 via-secondary-800/20 to-accent-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-responsive-xl font-bold text-gray-100 mb-4">
              Detailed Impact Metrics
            </h2>
            <p className="text-responsive text-gray-300 max-w-2xl mx-auto">
              Comprehensive data showing our impact across different areas of mental health support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {impactMetrics.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + categoryIndex * 0.1 }}
                className="card-3d p-6"
              >
                <h3 className="text-xl font-bold text-gray-100 mb-6 text-center">{category.category}</h3>
                <div className="space-y-4">
                  {category.metrics.map((metric, metricIndex) => (
                    <motion.div
                      key={metric.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={statsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.4 + categoryIndex * 0.1 + metricIndex * 0.05 }}
                      className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg"
                    >
                      <div>
                        <p className="text-gray-300 text-sm font-medium">{metric.name}</p>
                        <p className="text-2xl font-bold text-gray-100">{metric.value}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 text-sm font-medium">{metric.change}</div>
                        <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section 
        ref={storiesRef}
        className="py-20 bg-gradient-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={storiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-responsive-xl font-bold text-gray-100 mb-4">
              Success Stories
            </h2>
            <p className="text-responsive text-gray-400 max-w-2xl mx-auto">
              Real stories from real people whose lives have been transformed through our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 50 }}
                animate={storiesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="card-3d overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    imageId={`story-${story.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg">{story.name}</h3>
                    <p className="text-gray-300 text-sm">{story.age} • {story.location}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    "{story.story}"
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-300 font-medium">{story.improvement}</span>
                    </div>
                    <span className="text-gray-500">{story.timeFrame}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-br from-accent-900/30 via-accent-800/20 to-primary-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={storiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-responsive-xl font-bold text-gray-100 mb-4">
              Recognition & Achievements
            </h2>
            <p className="text-responsive text-gray-300 max-w-2xl mx-auto">
              Awards and recognition for our commitment to mental health innovation and community impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={storiesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className="card-3d p-6 text-center group"
                >
                  <div className="w-16 h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-accent-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-100 mb-3">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{achievement.description}</p>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-accent-500/20 rounded-full">
                    <span className="text-accent-500 text-sm font-medium">{achievement.year}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-crisis-900/50 via-crisis-800/30 to-crisis-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={storiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-responsive-xl font-bold text-gray-100">
              Be Part of Our Impact
            </h2>
            <p className="text-responsive text-gray-300 max-w-2xl mx-auto">
              Join thousands of others who are making a difference in mental health support. 
              Every interaction, every connection, every moment of support matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-responsive-lg px-8 py-4 inline-flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Get Support Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="btn-outline text-responsive-lg px-8 py-4 inline-flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>View Full Report</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Impact; 