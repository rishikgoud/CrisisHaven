import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  User, 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Star,
  CheckCircle,
  Calendar,
  Clock,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Award,
  Shield,
  Heart,
  Image as ImageIcon
} from 'lucide-react';

const Providers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [imageLoadStates, setImageLoadStates] = useState({});

  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [providersRef, providersInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const specialties = [
    { id: 'all', name: 'All Specialties', count: 156 },
    { id: 'crisis', name: 'Crisis Intervention', count: 23 },
    { id: 'depression', name: 'Depression', count: 45 },
    { id: 'anxiety', name: 'Anxiety & Stress', count: 38 },
    { id: 'trauma', name: 'Trauma & PTSD', count: 28 },
    { id: 'addiction', name: 'Addiction Recovery', count: 22 },
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'us', name: 'United States' },
    { id: 'ca', name: 'Canada' },
    { id: 'uk', name: 'United Kingdom' },
    { id: 'au', name: 'Australia' },
    { id: 'online', name: 'Online Therapy' },
  ];

  const availability = [
    { id: 'all', name: 'All Availability' },
    { id: 'immediate', name: 'Immediate' },
    { id: 'within-week', name: 'Within a Week' },
    { id: 'within-month', name: 'Within a Month' },
  ];

  const providers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Licensed Clinical Psychologist',
      specialties: ['crisis', 'depression', 'trauma'],
      location: 'us',
      availability: 'immediate',
      rating: 4.9,
      reviews: 234,
      experience: '15 years',
      languages: ['English', 'Spanish'],
      contact: {
        phone: '+1-555-1234',
        email: 'dr.johnson@therapy.com',
        website: 'www.drsarahjohnson.com',
        address: '123 Mental Health Ave, New York, NY 10001',
        office_hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-2PM',
        insurance: ['Blue Cross', 'Aetna', 'Cigna'],
        session_fee: '$150/hour'
      },
      verified: true,
      featured: true,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&fm=webp',
      bio: 'Specializing in crisis intervention and trauma therapy with over 15 years of experience helping individuals through their darkest moments.',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      title: 'Psychiatrist & Addiction Specialist',
      specialties: ['addiction', 'depression'],
      location: 'ca',
      availability: 'within-week',
      rating: 4.8,
      reviews: 189,
      experience: '12 years',
      languages: ['English', 'Mandarin'],
      contact: {
        phone: '+1-555-5678',
        email: 'dr.chen@addiction.com',
        website: 'www.drmichaelchen.com',
        address: '456 Recovery Street, Toronto, ON M5V 2H1',
        office_hours: 'Mon-Thu: 8AM-5PM, Fri: 8AM-12PM',
        insurance: ['OHIP', 'Blue Cross', 'Manulife'],
        session_fee: '$200/hour'
      },
      verified: true,
      featured: false,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&fm=webp',
      bio: 'Dedicated to helping individuals overcome addiction and mental health challenges through evidence-based treatment approaches.',
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      title: 'Licensed Marriage & Family Therapist',
      specialties: ['anxiety', 'trauma'],
      location: 'online',
      availability: 'immediate',
      rating: 4.7,
      reviews: 156,
      experience: '8 years',
      languages: ['English'],
      contact: {
        phone: '+1-555-9012',
        email: 'dr.watson@online.com',
        website: 'www.dremilywatson.com',
        address: 'Online Therapy - Available Worldwide',
        office_hours: 'Mon-Sun: 24/7 Availability',
        insurance: ['Out-of-network', 'Sliding scale available'],
        session_fee: '$120/hour'
      },
      verified: true,
      featured: true,
      image: 'https://images.unsplash.com/photo-1594824475545-9d0c7c4951c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&fm=webp',
      bio: 'Providing compassionate online therapy for anxiety and trauma, making mental health support accessible from anywhere.',
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      title: 'Clinical Social Worker',
      specialties: ['crisis', 'depression'],
      location: 'uk',
      availability: 'within-month',
      rating: 4.6,
      reviews: 98,
      experience: '10 years',
      languages: ['English'],
      contact: {
        phone: '+44-20-1234',
        email: 'dr.wilson@socialwork.com',
        website: 'www.drjameswilson.co.uk',
        address: '789 Mental Health Lane, London, UK SW1A 1AA',
        office_hours: 'Mon-Fri: 9AM-5PM',
        insurance: ['NHS', 'Private insurance accepted'],
        session_fee: '£80/hour'
      },
      verified: true,
      featured: false,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&fm=webp',
      bio: 'Specializing in crisis intervention and depression treatment with a focus on social determinants of mental health.',
    },
    {
      id: 5,
      name: 'Dr. Maria Rodriguez',
      title: 'Licensed Professional Counselor',
      specialties: ['anxiety', 'trauma'],
      location: 'us',
      availability: 'within-week',
      rating: 4.8,
      reviews: 145,
      experience: '6 years',
      languages: ['English', 'Spanish'],
      contact: {
        phone: '+1-555-3456',
        email: 'dr.rodriguez@counseling.com',
        website: 'www.drmariarodriguez.com',
        address: '321 Wellness Blvd, Los Angeles, CA 90210',
        office_hours: 'Mon-Fri: 10AM-7PM, Sat: 9AM-3PM',
        insurance: ['Blue Shield', 'Kaiser', 'UnitedHealth'],
        session_fee: '$140/hour'
      },
      verified: true,
      featured: false,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&fm=webp',
      bio: 'Bilingual therapist specializing in anxiety and trauma treatment with a culturally sensitive approach.',
    },
    {
      id: 6,
      name: 'Dr. David Kim',
      title: 'Psychologist & Crisis Specialist',
      specialties: ['crisis', 'addiction'],
      location: 'online',
      availability: 'immediate',
      rating: 4.9,
      reviews: 267,
      experience: '18 years',
      languages: ['English', 'Korean'],
      contact: {
        phone: '+1-555-7890',
        email: 'dr.kim@crisis.com',
        website: 'www.drdavidkim.com',
        address: 'Online Crisis Support - 24/7 Global Access',
        office_hours: '24/7 Crisis Support Available',
        insurance: ['Crisis services often covered', 'Sliding scale'],
        session_fee: '$180/hour (crisis rates may vary)'
      },
      verified: true,
      featured: true,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&fm=webp',
      bio: 'Expert in crisis intervention and addiction recovery with nearly two decades of experience in emergency mental health.',
    },
  ];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || provider.specialties.includes(selectedSpecialty);
    const matchesLocation = selectedLocation === 'all' || provider.location === selectedLocation;
    const matchesAvailability = selectedAvailability === 'all' || provider.availability === selectedAvailability;
    return matchesSearch && matchesSpecialty && matchesLocation && matchesAvailability;
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

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'immediate':
        return 'text-green-400 bg-green-500/20';
      case 'within-week':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'within-month':
        return 'text-blue-400 bg-blue-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const handleContact = (provider, type) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${provider.contact.phone}`);
        break;
      case 'email':
        window.open(`mailto:${provider.contact.email}`);
        break;
      case 'website':
        window.open(`https://${provider.contact.website}`, '_blank');
        break;
      case 'book':
        // Open booking modal or redirect to booking page
        alert(`Booking appointment with ${provider.name}. Please contact them directly at ${provider.contact.phone} or ${provider.contact.email}`);
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
              <User className="w-4 h-4" />
              <span>Mental Health Providers</span>
            </div>

            <h1 className="text-responsive-2xl font-bold text-gray-100 leading-tight">
              Find Your <span className="text-gradient">Mental Health Provider</span>
            </h1>
            
            <p className="text-responsive-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with licensed mental health professionals who specialize in crisis intervention, 
              therapy, and ongoing support. All providers are verified and experienced.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search providers..."
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
            {/* Specialties */}
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty.id}
                  onClick={() => setSelectedSpecialty(specialty.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedSpecialty === specialty.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  {specialty.name} ({specialty.count})
                </button>
              ))}
            </div>

            {/* Location and Availability Filters */}
            <div className="flex items-center space-x-4">
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
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {availability.map((avail) => (
                    <option key={avail.id} value={avail.id}>
                      {avail.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Providers Grid */}
      <section 
        ref={providersRef}
        className="py-20 bg-gradient-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 50 }}
                animate={providersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card-3d overflow-hidden group"
              >
                <div className="flex">
                  <div className="w-32 h-32 flex-shrink-0">
                    <OptimizedImage
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                      imageId={provider.id.toString()}
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-100 group-hover:text-primary-400 transition-colors">
                          {provider.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{provider.title}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(provider.rating)}
                        <span className="text-gray-400 text-sm ml-1">({provider.reviews})</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {provider.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {provider.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded"
                        >
                          {specialties.find(s => s.id === specialty)?.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{provider.experience}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Globe className="w-4 h-4" />
                          <span>{provider.languages.join(', ')}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(provider.availability)}`}>
                        {availability.find(a => a.id === provider.availability)?.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleContact(provider, 'contact')}
                        className="btn-primary flex-1 flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Contact</span>
                      </button>
                      <button 
                        onClick={() => handleContact(provider, 'book')}
                        className="btn-outline flex items-center justify-center space-x-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book</span>
                      </button>
                    </div>

                    {/* Contact Details */}
                    <div className="mt-4 p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-200 mb-2">Contact Information</h4>
                      <div className="space-y-1 text-xs text-gray-400">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3" />
                          <span>{provider.contact.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3" />
                          <span>{provider.contact.office_hours}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Fee:</span>
                          <span>{provider.contact.session_fee}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-300 mb-2">No providers found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Providers; 