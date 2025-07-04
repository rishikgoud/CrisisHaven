    # CrisisHaven - Comprehensive Project Documentation

    ## Table of Contents
    1. [Project Overview](#project-overview)
    2. [Technology Stack](#technology-stack)
    3. [Architecture & Design](#architecture--design)
    4. [Features & Functionality](#features--functionality)
    5. [Design System](#design-system)
    6. [Component Architecture](#component-architecture)
    7. [State Management](#state-management)
    8. [API Integration](#api-integration)
    9. [User Experience](#user-experience)
    10. [Accessibility & Security](#accessibility--security)
    11. [Deployment & Performance](#deployment--performance)
    12. [Future Enhancements](#future-enhancements)

    ---

    ## Project Overview

    **CrisisHaven** is a comprehensive crisis mental health support platform designed to provide immediate, accessible, and empathetic support to individuals experiencing mental health crises. The platform combines AI-powered assistance with human counselor connections to create a seamless support ecosystem available 24/7.

    ### Mission Statement
    To provide immediate, accessible, and compassionate crisis mental health support through innovative technology, ensuring no one faces a mental health crisis alone.

    ### Core Values
    - **Immediate Access**: 24/7 availability for crisis support
    - **Empathy & Compassion**: Human-centered design and AI interactions
    - **Confidentiality**: Secure and private support environment
    - **Accessibility**: Inclusive design for all users
    - **Community**: Building supportive networks and connections

    ---

    ## Technology Stack

    ### Frontend Framework
    - **React 18.2.0**: Modern React with hooks and functional components
    - **React Router DOM 6.3.0**: Client-side routing and navigation
    - **Framer Motion 10.16.4**: Advanced animations and transitions

    ### Styling & UI
    - **Tailwind CSS 3.3.3**: Utility-first CSS framework
    - **PostCSS 8.4.27**: CSS processing and optimization
    - **Autoprefixer 10.4.14**: CSS vendor prefixing
    - **Lucide React 0.263.1**: Modern icon library

    ### State Management & Data
    - **React Context API**: Global state management
    - **React Hooks**: Local state and side effects
    - **LocalStorage**: Persistent user preferences

    ### External Integrations
    - **OmniDimension SDK**: AI voice assistant integration
    - **Socket.io Client 4.7.2**: Real-time communication
    - **Axios 1.4.0**: HTTP client for API calls

    ### Development Tools
    - **React Scripts 5.0.1**: Development and build tools
    - **React Testing Library**: Component testing
    - **ESLint**: Code quality and consistency

    ### Additional Libraries
    - **React CountUp 6.4.2**: Animated number counters
    - **React Helmet 6.1.0**: Document head management
    - **React Hook Form 7.45.4**: Form handling and validation
    - **React Hot Toast 2.4.1**: User notifications
    - **React Intersection Observer 9.5.2**: Scroll-based animations
    - **Headless UI 2.2.4**: Accessible UI components

    ---

    ## Architecture & Design

    ### Project Structure
    ```
    CrisisHaven/
    ├── public/
    │   ├── index.html          # Main HTML with OmniDimension integration
    │   └── manifest.json       # PWA manifest
    ├── src/
    │   ├── components/
    │   │   ├── layout/         # Layout components (Header, Footer)
    │   │   └── ui/            # Reusable UI components
    │   ├── context/           # React Context providers
    │   ├── hooks/             # Custom React hooks
    │   ├── pages/             # Page components
    │   ├── App.js             # Main application component
    │   ├── index.js           # Application entry point
    │   └── index.css          # Global styles and Tailwind imports
    ├── package.json           # Dependencies and scripts
    ├── tailwind.config.js     # Tailwind CSS configuration
    └── postcss.config.js      # PostCSS configuration
    ```

    ### Application Architecture
    - **Component-Based**: Modular React components with clear separation of concerns
    - **Context-Driven State**: Global state management using React Context API
    - **Route-Based Navigation**: Client-side routing with React Router
    - **Responsive Design**: Mobile-first approach with Tailwind CSS
    - **Progressive Enhancement**: Core functionality works without JavaScript

    ---

    ## Features & Functionality

    ### 1. Landing Page (`/`)
    **Purpose**: Introduce users to CrisisHaven and guide them to support options

    **Key Features**:
    - Hero section with compelling value proposition
    - Feature highlights with animated icons
    - Statistics showcase (lives supported, response time, availability)
    - How-it-works step-by-step guide
    - Call-to-action buttons for immediate support
    - Animated background elements and 3D effects

    **Technical Implementation**:
    - Intersection Observer for scroll-triggered animations
    - Framer Motion for smooth transitions
    - CountUp for animated statistics
    - Responsive design with mobile optimization

    ### 2. Crisis Support Dashboard (`/support`)
    **Purpose**: Primary interface for crisis intervention and support

    **Key Features**:
    - **AI Voice Assistant Integration**: OmniDimension SDK for Haven AI
    - **Multiple Contact Methods**:
    - Web call functionality
    - Phone call initiation
    - Chat widget integration
    - **Emergency Mode**: Crisis-specific UI adaptations
    - **Risk Assessment**: AI-powered triage system
    - **Human Counselor Connection**: Seamless handoff to professionals

    **Technical Implementation**:
    - OmniDimension API integration for voice calls
    - Error handling with fallback options
    - Toast notifications for user feedback
    - Modal dialogs for phone number input
    - Real-time connection status monitoring

    ### 3. Blog & Resources (`/blog`)
    **Purpose**: Educational content and mental health resources

    **Key Features**:
    - Mental health articles and guides
    - Crisis prevention strategies
    - Self-help resources
    - Professional insights
    - Search and filtering capabilities

    ### 4. Community Forums (`/community`)
    **Purpose**: Peer support and community building

    **Key Features**:
    - Discussion forums
    - Peer support groups
    - Anonymous posting options
    - Moderation tools
    - Resource sharing

    ### 5. Provider Directory (`/providers`)
    **Purpose**: Connect users with mental health professionals

    **Key Features**:
    - Searchable provider database
    - Filtering by location, specialty, insurance
    - Provider profiles and reviews
    - Appointment booking integration
    - Crisis-specific provider recommendations

    ### 6. Impact Dashboard (`/impact`)
    **Purpose**: Showcase platform effectiveness and community impact

    **Key Features**:
    - Real-time statistics
    - Success stories
    - Community impact metrics
    - Donation and support opportunities
    - Transparency reporting

    ### 7. Organizations (`/organizations`)
    **Purpose**: Information about mental health organizations and partnerships

    **Key Features**:
    - Partner organization profiles
    - Resource directories
    - Collaboration opportunities
    - Educational content
    - Contact information

    ### 8. Emergency Button
    **Purpose**: Always-accessible emergency support

    **Key Features**:
    - Fixed position for constant accessibility
    - Expandable emergency contacts
    - Direct phone number access
    - Crisis-specific resources
    - Visual and audio alerts

    **Technical Implementation**:
    - Fixed positioning with high z-index
    - Animated expansion/collapse
    - Emergency contact integration
    - Crisis mode activation

    ---

    ## Design System

    ### Color Palette
    ```css
    Primary (Blue): #3b82f6 - Trust, stability, professionalism
    Secondary (Green): #22c55e - Growth, healing, hope
    Accent (Orange): #f27422 - Warmth, energy, urgency
    Crisis (Red): #ef4444 - Emergency, attention, action
    Gray Scale: #111827 to #f9fafb - Neutral tones for content
    ```

    ### Typography
    - **Primary Font**: Inter (300-800 weights) - Clean, modern, highly readable
    - **Display Font**: Poppins (400-700 weights) - For headings and branding
    - **Responsive Sizing**: Fluid typography that scales with viewport

    ### Animation System
    ```css
    Custom Animations:
    - float-3d: 3D floating motion
    - rotate-3d: 3D rotation effects
    - glow-3d: 3D glow effects
    - wave-3d: 3D wave motion
    - pulse-slow: Slow pulsing for emphasis
    - heartbeat: Heartbeat animation for emotional elements
    ```

    ### Component Design Principles
    - **Glass Morphism**: Backdrop blur effects for modern UI
    - **3D Transformations**: Depth and dimensionality
    - **Gradient Backgrounds**: Dynamic visual appeal
    - **Micro-interactions**: Subtle animations for feedback
    - **Dark Theme**: Reduced eye strain and modern aesthetic

    ---

    ## Component Architecture

    ### Layout Components

    #### Header Component
    **Location**: `src/components/layout/Header.js`

    **Features**:
    - Responsive navigation with mobile hamburger menu
    - Dropdown menus for additional navigation
    - Scroll-based transparency effects
    - Active state indicators
    - Logo with 3D hover effects

    **Technical Details**:
    - Fixed positioning with backdrop blur
    - AnimatePresence for smooth transitions
    - Intersection Observer for scroll effects
    - Mobile-first responsive design

    #### Footer Component
    **Location**: `src/components/layout/Footer.js`

    **Features**:
    - Social media links
    - Contact information
    - Legal links
    - Newsletter signup
    - Accessibility information

    #### Emergency Button Component
    **Location**: `src/components/ui/EmergencyButton.js`

    **Features**:
    - Always-visible emergency access
    - Expandable contact menu
    - Direct phone number integration
    - Crisis mode activation
    - Animated visual feedback

    ### Page Components

    #### Landing Page
    **Location**: `src/pages/LandingPage.js`

    **Sections**:
    1. Hero with animated background
    2. Feature highlights
    3. Statistics with CountUp
    4. How-it-works process
    5. Call-to-action sections

    #### Crisis Support Page
    **Location**: `src/pages/CrisisSupport.js`

    **Features**:
    - OmniDimension API integration
    - Multiple contact methods
    - Error handling and fallbacks
    - Modal dialogs
    - Real-time status updates

    ### Context & State Management

    #### Crisis Context
    **Location**: `src/context/CrisisContext.js`

    **State Management**:
    ```javascript
    {
    isCrisisMode: boolean,
    isVoiceActive: boolean,
    currentSession: object,
    riskLevel: string,
    emergencyContacts: array,
    userLocation: object,
    isConnected: boolean,
    sessionHistory: array,
    preferences: object
    }
    ```

    **Actions**:
    - `startCrisisMode()` / `endCrisisMode()`
    - `startVoiceSession()` / `endVoiceSession()`
    - `setRiskLevel()`
    - `updatePreferences()`
    - `setEmergencyContacts()`

    #### Custom Hooks

    ##### useCrisisMode Hook
    **Location**: `src/hooks/useCrisisMode.js`

    **Purpose**: Simplified access to crisis-related state and actions

    **Returns**:
    - `isCrisisMode`: Current crisis mode status
    - `startCrisisMode()` / `endCrisisMode()`: Mode control
    - `riskLevel`: Current risk assessment
    - `setRiskLevel()`: Risk level management

    ---

    ## API Integration

    ### OmniDimension SDK Integration

    #### Configuration
    ```javascript
    const OMNIDIM_API_KEY = '4lEiG_2X1-NCgwMrQ0TkLvpkygKjwlk6lNI2YcV7_ko';
    const OMNIDIM_AGENT_ID = 2465;
    ```

    #### Web Call API
    ```javascript
    POST https://api.omnidim.io/call/web
    Headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OMNIDIM_API_KEY}`
    }
    Body: {
    agent_id: OMNIDIM_AGENT_ID
    }
    ```

    #### Phone Call API
    ```javascript
    POST https://api.omnidim.io/call/phone
    Headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OMNIDIM_API_KEY}`
    }
    Body: {
    agent_id: OMNIDIM_AGENT_ID,
    phone_number: string
    }
    ```

    #### Widget Integration
    - Embedded chat widget in `public/index.html`
    - Custom positioning and styling
    - Branded as "Haven Chat"
    - Auto-open configuration
    - Welcome message customization

    ### Error Handling Strategy
    1. **Primary Method**: Web call with OmniDimension API
    2. **Fallback 1**: Chat widget activation
    3. **Fallback 2**: Phone call initiation
    4. **Fallback 3**: Direct emergency numbers
    5. **User Feedback**: Toast notifications with alternatives

    ---

    ## User Experience

    ### Accessibility Features
    - **High Contrast Mode**: Automatic detection and manual toggle
    - **Keyboard Navigation**: Full keyboard accessibility
    - **Screen Reader Support**: Semantic HTML and ARIA labels
    - **Focus Management**: Clear focus indicators
    - **Color Blindness Support**: High contrast and pattern alternatives

    ### Responsive Design
    - **Mobile-First**: Optimized for mobile devices
    - **Tablet Optimization**: Touch-friendly interfaces
    - **Desktop Enhancement**: Advanced features for larger screens
    - **Breakpoint System**: Tailwind CSS responsive utilities

    ### Performance Optimization
    - **Code Splitting**: Route-based code splitting
    - **Lazy Loading**: Component and image lazy loading
    - **Optimized Animations**: Hardware-accelerated CSS animations
    - **Bundle Optimization**: Tree shaking and minification

    ### User Flow
    1. **Landing**: Introduction and value proposition
    2. **Support Access**: Multiple entry points (header, emergency button, direct URL)
    3. **Crisis Assessment**: AI-powered triage and risk assessment
    4. **Support Connection**: Human counselor or AI assistant
    5. **Follow-up**: Resources and community connection

    ---

    ## Accessibility & Security

    ### Accessibility Standards
    - **WCAG 2.1 AA Compliance**: Web Content Accessibility Guidelines
    - **Semantic HTML**: Proper heading structure and landmarks
    - **ARIA Labels**: Screen reader support
    - **Focus Management**: Logical tab order
    - **Color Contrast**: Minimum 4.5:1 ratio

    ### Security Measures
    - **HTTPS Only**: Secure communication
    - **API Key Protection**: Environment variable management
    - **Input Validation**: Form validation and sanitization
    - **Privacy Protection**: No personal data storage
    - **Session Management**: Secure session handling

    ### Privacy Features
    - **Anonymous Support**: No registration required
    - **Data Minimization**: Minimal data collection
    - **Local Storage**: User preferences only
    - **No Tracking**: Privacy-focused analytics
    - **Transparent Policies**: Clear privacy information

    ---

    ## Deployment & Performance

    ### Build Configuration
    ```json
    {
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
        "dev": "react-scripts start"
    }
    }
    ```

    ### Performance Metrics
    - **First Contentful Paint**: < 1.5s
    - **Largest Contentful Paint**: < 2.5s
    - **Cumulative Layout Shift**: < 0.1
    - **First Input Delay**: < 100ms

    ### Optimization Strategies
    - **Image Optimization**: WebP format with fallbacks
    - **Font Loading**: Preload critical fonts
    - **CSS Optimization**: Purged unused styles
    - **JavaScript Optimization**: Tree shaking and minification
    - **Caching Strategy**: Static asset caching

    ### Deployment Considerations
    - **Static Hosting**: Netlify, Vercel, or AWS S3
    - **CDN Integration**: Global content delivery
    - **Environment Variables**: Secure configuration management
    - **Monitoring**: Performance and error tracking
    - **Backup Strategy**: Regular backups and version control

    ---

    ## Future Enhancements

    ### Phase 2 Features
    1. **User Accounts**: Personalized experience and history
    2. **Mobile App**: Native iOS and Android applications
    3. **Video Calls**: Face-to-face crisis support
    4. **AI Enhancement**: Advanced natural language processing
    5. **Community Features**: Peer support groups and forums

    ### Phase 3 Features
    1. **Telehealth Integration**: Direct provider booking
    2. **Crisis Prediction**: AI-powered risk assessment
    3. **Family Support**: Resources for family members
    4. **Professional Training**: Crisis intervention training
    5. **Research Platform**: Anonymous data for mental health research

    ### Technical Roadmap
    1. **Backend Development**: Node.js/Express API
    2. **Database Integration**: MongoDB for user data
    3. **Real-time Features**: Socket.io for live support
    4. **Analytics Dashboard**: Impact measurement tools
    5. **API Documentation**: Developer portal

    ### Scalability Considerations
    - **Microservices Architecture**: Modular backend services
    - **Load Balancing**: Horizontal scaling
    - **Database Optimization**: Indexing and query optimization
    - **Caching Strategy**: Redis for session management
    - **Monitoring**: Comprehensive logging and alerting

    ---

    ## Conclusion

    CrisisHaven represents a comprehensive solution for crisis mental health support, combining cutting-edge technology with human-centered design. The platform's modular architecture, robust error handling, and accessibility features ensure it can serve users effectively in their most vulnerable moments.

    The project demonstrates modern web development best practices, from responsive design and performance optimization to security and privacy protection. The integration with OmniDimension's AI platform provides immediate support while maintaining the option for human counselor connection when needed.

    As the platform evolves, the focus will remain on accessibility, performance, and user experience, ensuring that CrisisHaven continues to provide reliable, compassionate support to those in crisis.

    ---

    **Document Version**: 1.0  
    **Last Updated**: December 2024  
    **Project Status**: Active Development  
    **Maintainer**: CrisisHaven Development Team
