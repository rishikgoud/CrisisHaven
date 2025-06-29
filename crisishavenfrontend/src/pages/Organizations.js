import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Building2, 
  Users, 
  Globe, 
  Shield, 
  Heart,
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  Globe as GlobeIcon,
  ArrowRight,
  Star,
  CheckCircle,
  Sparkles,
  Award,
  Image as ImageIcon
} from 'lucide-react';

const Organizations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [imageLoadStates, setImageLoadStates] = useState({});

  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [orgsRef, orgsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const categories = [
    { id: 'all', name: 'All Organizations', count: 45 },
    { id: 'crisis', name: 'Crisis Centers', count: 12 },
    { id: 'therapy', name: 'Therapy Centers', count: 18 },
    { id: 'support', name: 'Support Groups', count: 8 },
    { id: 'research', name: 'Research Institutes', count: 7 },
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'us', name: 'United States' },
    { id: 'ca', name: 'Canada' },
    { id: 'uk', name: 'United Kingdom' },
    { id: 'au', name: 'Australia' },
    { id: 'online', name: 'Online Services' },
  ];

  const organizations = [
    {
      id: 1,
      name: 'National Crisis Support Network',
      description: 'Leading crisis intervention and suicide prevention organization with 24/7 support services.',
      category: 'crisis',
      location: 'us',
      rating: 4.8,
      reviews: 1247,
      services: ['Crisis Hotline', 'Emergency Intervention', 'Follow-up Care'],
      contact: {
        phone: '+1-800-CRISIS',
        email: 'help@ncrisis.org',
        website: 'www.ncrisis.org',
      },
      verified: true,
      featured: true,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp',
    },
    {
      id: 2,
      name: 'Mindful Therapy Collective',
      description: 'Comprehensive mental health services with a focus on mindfulness and holistic healing.',
      category: 'therapy',
      location: 'us',
      rating: 4.9,
      reviews: 892,
      services: ['Individual Therapy', 'Group Sessions', 'Mindfulness Training'],
      contact: {
        phone: '+1-555-MIND',
        email: 'hello@mindfultherapy.org',
        website: 'www.mindfultherapy.org',
      },
      verified: true,
      featured: false,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp',
    },
    {
      id: 3,
      name: 'Global Mental Health Alliance',
      description: 'International organization dedicated to improving mental health access worldwide.',
      category: 'research',
      location: 'online',
      rating: 4.7,
      reviews: 2156,
      services: ['Research', 'Advocacy', 'Global Programs'],
      contact: {
        phone: '+1-800-GLOBAL',
        email: 'info@globalmha.org',
        website: 'www.globalmha.org',
      },
      verified: true,
      featured: true,
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp',
    },
    {
      id: 4,
      name: 'Recovery Support Network',
      description: 'Peer-led support groups and recovery coaching for mental health and addiction recovery.',
      category: 'support',
      location: 'ca',
      rating: 4.6,
      reviews: 567,
      services: ['Peer Support', 'Recovery Coaching', 'Support Groups'],
      contact: {
        phone: '+1-555-RECOVER',
        email: 'support@recoverynetwork.ca',
        website: 'www.recoverynetwork.ca',
      },
      verified: true,
      featured: false,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp',
    },
    {
      id: 5,
      name: 'Youth Mental Health Foundation',
      description: 'Specialized mental health services for children, adolescents, and young adults.',
      category: 'therapy',
      location: 'uk',
      rating: 4.8,
      reviews: 789,
      services: ['Youth Therapy', 'Family Counseling', 'School Programs'],
      contact: {
        phone: '+44-20-YOUTH',
        email: 'hello@youthmhf.org.uk',
        website: 'www.youthmhf.org.uk',
      },
      verified: true,
      featured: false,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp',
    },
    {
      id: 6,
      name: 'Digital Wellness Institute',
      description: 'Innovative online mental health platform with AI-powered support and digital therapeutics.',
      category: 'therapy',
      location: 'online',
      rating: 4.5,
      reviews: 1234,
      services: ['Digital Therapy', 'AI Support', 'Wellness Apps'],
      contact: {
        phone: '+1-800-DIGITAL',
        email: 'info@digitalwellness.org',
        website: 'www.digitalwellness.org',
      },
      verified: true,
      featured: false,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&fm=webp',
    },
  ];

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || org.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || org.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
              ? 'text-yellow-400' 
              : 'text-gray-600'
        }`}
      />
    ));
  };

  const handleContact = (org, type) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${org.contact.phone}`);
        break;
      case 'email':
        window.open(`mailto:${org.contact.email}`);
        break;
      case 'website':
        window.open(`https://${org.contact.website}`, '_blank');
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
              <Building2 className="w-4 h-4" />
              <span>Mental Health Organizations</span>
            </div>

            <h1 className="text-responsive-2xl font-bold text-gray-100 leading-tight">
              Find <span className="text-gradient">Professional Help</span>
            </h1>
            
            <p className="text-responsive-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with verified mental health organizations, crisis centers, and support services. 
              All organizations are carefully vetted to ensure quality care and support.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
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

            {/* Location Filter */}
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Organizations Grid */}
      <section 
        ref={orgsRef}
        className="py-20 bg-gradient-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredOrganizations.map((org, index) => (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 50 }}
                animate={orgsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card-3d overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={org.image}
                    alt={org.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    imageId={org.id.toString()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {org.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-accent-500/90 text-white text-xs font-medium rounded">
                        Featured
                      </span>
                    </div>
                  )}
                  {org.verified && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-100 group-hover:text-primary-400 transition-colors">
                      {org.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {renderStars(org.rating)}
                      <span className="text-gray-400 text-sm ml-1">({org.reviews})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {org.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {org.services.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleContact(org, 'website')}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <span>Contact Organization</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Contact Details */}
                  <div className="mt-4 p-4 bg-gray-800/30 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-200 mb-2">Contact Information</h4>
                    <div className="space-y-2 text-xs text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3" />
                        <span>{org.contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-3 h-3" />
                        <span>{org.contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GlobeIcon className="w-3 h-3" />
                        <span>{org.contact.website}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredOrganizations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-300 mb-2">No organizations found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Organizations; 