import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { 
  Mic, 
  Heart, 
  Users, 
  ArrowRight, 
  Shield, 
  Clock, 
  Globe,
  CheckCircle,
  Play,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';

const LandingPage = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [howItWorksRef, howItWorksInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const features = [
    {
      icon: Mic,
      title: 'Instant AI Support',
      description: 'Connect with Haven, our AI companion, for immediate triage and emotional support.',
      color: 'primary',
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      icon: Heart,
      title: 'Human Counselor Connection',
      description: 'Seamlessly transition to licensed mental health professionals when needed.',
      color: 'secondary',
      gradient: 'from-secondary-500 to-secondary-600',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Join a supportive community of peers who understand what you\'re going through.',
      color: 'accent',
      gradient: 'from-accent-500 to-accent-600',
    },
  ];

  const statistics = [
    {
      number: 50000,
      suffix: '+',
      label: 'Lives Supported',
      icon: Heart,
      color: 'primary',
    },
    {
      number: 30,
      suffix: 's',
      label: 'Average Response Time',
      icon: Clock,
      color: 'secondary',
    },
    {
      number: 24,
      suffix: '/7',
      label: 'Availability',
      icon: Globe,
      color: 'accent',
    },
  ];

  const steps = [
    {
      step: '1',
      title: 'Click to Talk',
      description: 'Press the voice button to start your conversation with Haven',
      icon: Play,
    },
    {
      step: '2',
      title: 'Haven Listens',
      description: 'Our AI assistant understands your needs and provides immediate support',
      icon: Mic,
    },
    {
      step: '3',
      title: 'Get Connected',
      description: 'Connect with human counselors or community resources as needed',
      icon: Users,
    },
    {
      step: '4',
      title: 'Receive Support',
      description: 'Get the help you need, when you need it most',
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-20 w-32 h-32 bg-primary-500/20 rounded-full animate-float-3d"
          />
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
              rotate: [0, -180, -360]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-40 right-20 w-24 h-24 bg-secondary-500/20 rounded-full animate-rotate-3d"
          />
          <motion.div
            animate={{ 
              x: [0, 60, 0],
              y: [0, -30, 0],
              rotate: [0, 90, 180]
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-40 left-1/4 w-20 h-20 bg-accent-500/20 rounded-full animate-wave-3d"
          />
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute w-2 h-2 bg-primary-500 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-500 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Crisis Support</span>
            </motion.div>

            <h1 className="text-responsive-2xl font-bold text-gray-100 leading-tight">
              Immediate Crisis Support,{' '}
              <span className="text-gradient">24/7</span>
            </h1>
            
            <p className="text-responsive-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with Haven, our AI companion, for instant triage and human counselor connection. 
              Free, confidential, and always here when you need us.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/support"
                className="btn-crisis text-responsive-lg px-6 py-3 flex items-center space-x-2 animate-glow-3d"
              >
                <Mic className="w-5 h-5" />
                <span>Talk to Haven Now</span>
                <Zap className="w-4 h-4" />
              </Link>
              
              <Link
                to="/blog"
                className="btn-outline text-responsive-lg px-6 py-3 flex items-center space-x-2"
              >
                <span>Browse Resources</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-secondary-500" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-accent-500" />
                <span>Free & Confidential</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 bg-gradient-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-responsive-xl font-bold text-gray-100 mb-4">
              Comprehensive Crisis Support
            </h2>
            <p className="text-responsive text-gray-400 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with human compassion 
              to provide the support you need, when you need it most.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="card-3d p-8 text-center group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 animate-glow-3d`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-100 mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section 
        ref={statsRef}
        className="py-20 bg-gradient-to-br from-primary-900/50 via-primary-800/30 to-secondary-900/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-responsive-xl font-bold text-gray-100 mb-4">
              Making a Real Impact
            </h2>
            <p className="text-responsive text-gray-300 max-w-2xl mx-auto">
              Our platform has helped thousands of people find hope and support 
              during their darkest moments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 animate-float-3d">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    <CountUp
                      end={stat.number}
                      suffix={stat.suffix}
                      duration={2.5}
                      delay={index * 0.3}
                    />
                  </div>
                  <p className="text-gray-300 font-medium text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        ref={howItWorksRef}
        className="py-20 bg-gradient-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-responsive-xl font-bold text-gray-100 mb-4">
              How It Works
            </h2>
            <p className="text-responsive text-gray-400 max-w-2xl mx-auto">
              Getting help is simple and immediate. Here's how our process works:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="card-3d p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="w-16 h-16 bg-primary-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow-3d">
                      <Icon className="w-8 h-8 text-primary-500" />
                    </div>
                    <h3 className="text-base font-bold text-gray-100 mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-xs">{step.description}</p>
                  </div>

                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-transparent transform -translate-y-1/2" />
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link
              to="/support"
              className="btn-primary text-responsive-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <Mic className="w-5 h-5" />
              <span>Start Your Journey</span>
              <Star className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 