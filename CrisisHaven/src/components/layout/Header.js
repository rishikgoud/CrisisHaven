import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  Menu, 
  X, 
  Home, 
  Heart, 
  Users, 
  FileText, 
  Building2, 
  BarChart3,
  Phone,
  ChevronDown,
  MoreHorizontal,
  BookOpen,
  User,
  LogOut
} from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavigation = [
    { 
      name: 'Home', 
      href: '/', 
      icon: Home,
    },
    { 
      name: 'Journal', 
      href: '/journal', 
      icon: BookOpen,
    },
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: BarChart3,
    },
    { 
      name: 'Peer Chat', 
      href: '/peer-chat', 
      icon: Users,
    },
    { 
      name: 'Support', 
      href: '/support', 
      icon: Heart,
    },
  ];

  const moreNavigation = [
    { 
      name: 'Find Help', 
      href: '/providers', 
      icon: Building2,
    },
    { 
      name: 'Impact', 
      href: '/impact', 
      icon: BarChart3,
    },
    { 
      name: 'Resources', 
      href: '/blog', 
      icon: FileText,
    },
    { 
      name: 'Organizations', 
      href: '/organizations', 
      icon: Users,
    },
  ];

  const isActive = (path) => location.pathname === path;

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleLogout = () => {
    logout();
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass shadow-2xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 180 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center transform-3d"
              >
                <Home className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-gradient font-poppins">
                CrisisHaven
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Main Navigation Items */}
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`nav-link flex items-center space-x-1 ${
                      isActive(item.href) ? 'active' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('more')}
                  className={`nav-link flex items-center space-x-1 ${
                    activeDropdown === 'more' ? 'active' : ''
                  }`}
                >
                  <MoreHorizontal className="w-4 h-4" />
                  <span>More</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                    activeDropdown === 'more' ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* More Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === 'more' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden"
                    >
                      <div className="py-2">
                        {moreNavigation.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.name}
                              to={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                            >
                              <Icon className="w-4 h-4" />
                              <span>{item.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Authentication Section */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle('profile')}
                    className="nav-link flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span>{user?.name?.split(' ')[0] || 'Profile'}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === 'profile' ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === 'profile' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden"
                      >
                        <div className="py-2">
                          <Link
                            to="/profile"
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                          >
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="nav-link"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-crisis flex items-center space-x-2"
                  >
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl shadow-2xl z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <span className="text-lg font-bold text-primary-500">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile navigation */}
              <nav className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-2">
                  {/* Main Navigation */}
                  {mainNavigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive(item.href)
                            ? 'text-primary-500 bg-gray-800'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}

                  {/* More Navigation */}
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">More</div>
                  {moreNavigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive(item.href)
                            ? 'text-primary-500 bg-gray-800'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}

                  {/* Divider */}
                  <div className="border-t border-gray-700 my-4"></div>

                  {/* Authentication Section */}
                  {isAuthenticated ? (
                    <>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Account</div>
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:text-white hover:bg-gray-800"
                      >
                        <User className="w-5 h-5" />
                        <span className="font-medium">Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:text-white hover:bg-gray-800"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Account</div>
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:text-white hover:bg-gray-800"
                      >
                        <User className="w-5 h-5" />
                        <span className="font-medium">Sign In</span>
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-crisis-500 hover:text-white hover:bg-crisis-500/20"
                      >
                        <span className="font-medium">Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              </nav>

              {/* Mobile CTA */}
              {isAuthenticated && (
                <div className="p-6 border-t border-gray-700">
                  <Link
                    to="/support"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-crisis w-full flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Talk to Haven</span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header; 