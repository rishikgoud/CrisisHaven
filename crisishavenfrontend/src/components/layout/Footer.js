import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Phone, 
  Mail, 
  Globe, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin,
  Github,
  Shield,
  Users,
  FileText,
  Building2,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    support: [
      { name: 'Crisis Support', href: '/support' },
      { name: 'Talk to Haven', href: '/support' },
      { name: 'Emergency Resources', href: '/emergency' },
      { name: 'Safety Planning', href: '/safety' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Mental Health Guides', href: '/guides' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Research', href: '/research' },
    ],
    community: [
      { name: 'Forums', href: '/community' },
      { name: 'Support Groups', href: '/groups' },
      { name: 'Events', href: '/events' },
      { name: 'Volunteer', href: '/volunteer' },
    ],
    findHelp: [
      { name: 'Mental Health Providers', href: '/providers' },
      { name: 'Crisis Centers', href: '/crisis-centers' },
      { name: 'Hotlines', href: '/hotlines' },
      { name: 'Treatment Options', href: '/treatment' },
    ],
    organization: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Mission', href: '/mission' },
      { name: 'Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'GitHub', href: '#', icon: Github },
  ];

  return (
    <footer className="bg-gradient-dark border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient font-poppins">
                CrisisHaven
              </span>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Providing immediate crisis support through AI technology and human compassion. 
              Free, confidential, and available 24/7 when you need us most.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-primary-500" />
                <span>1-800-CRISIS-HELP</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-secondary-500" />
                <span>support@crisishaven.org</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Globe className="w-4 h-4 text-accent-500" />
                <span>Available 24/7</span>
              </div>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-primary-500" />
              <span>Support</span>
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-secondary-500" />
              <span>Resources</span>
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Users className="w-4 h-4 text-accent-500" />
              <span>Community</span>
            </h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Find Help Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-primary-500" />
              <span>Find Help</span>
            </h3>
            <ul className="space-y-2">
              {footerLinks.findHelp.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-500 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">Stay updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-r-lg text-sm font-medium transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900/50 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-6 text-xs text-gray-400">
              <span>&copy; 2024 CrisisHaven. All rights reserved.</span>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>

            {/* Emergency Notice */}
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-crisis-500 rounded-full animate-pulse"></div>
              <span>If you're in immediate danger, call 911 or your local emergency services.</span>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-500 transition-all duration-200"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 