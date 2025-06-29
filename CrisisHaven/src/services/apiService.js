// API Service for CrisisHaven - handles backend API calls with fallbacks
import toast from 'react-hot-toast';

// Configuration
const API_CONFIG = {
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000',
  MOCK_MODE: process.env.REACT_APP_MOCK_API === 'true' || false,
  API_KEY: process.env.REACT_APP_OMNIDIM_API_KEY || '4lEiG_2X1-NCgwMrQ0TkLvpkygKjwlk6lNI2YcV7_ko',
  AGENT_ID: process.env.REACT_APP_OMNIDIM_AGENT_ID || 2465,
};

// Utility functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const simulateNetworkDelay = async () => {
  const delayTime = Math.random() * 2000 + 1000; // 1-3 seconds
  await delay(delayTime);
};

// Check if OmniDimension widget is available
const isWidgetAvailable = () => {
  return !!document.querySelector('#omnidimension-web-widget-container');
};

// Open OmniDimension voice widget
const openWidget = () => {
  const widget = document.querySelector('#omnidimension-web-widget-container');
  if (widget) {
    // Try to trigger voice widget open (this depends on OmniDimension's voice API)
    const widgetButton = widget.querySelector('[data-omnidim-widget]') || widget.querySelector('button') || widget;
    if (widgetButton) {
      widgetButton.click();
      return true;
    }
  }
  return false;
};

// Mock API responses for testing
const MOCK_RESPONSES = {
  web_call: {
    success: {
      sessionId: 'mock-session-12345',
      webCallUrl: 'https://mock-omnidim-chat.com/session/12345',
      status: 'connecting',
      message: 'Web call initiated successfully'
    },
    error: {
      error: 'mock_error',
      message: 'Mock API error for testing'
    }
  },
  phone_call: {
    success: {
      sessionId: 'mock-call-67890',
      status: 'initiated',
      phoneNumber: '+1234567890',
      estimatedWait: '2-3 minutes',
      message: 'Phone call initiated successfully'
    },
    error: {
      error: 'mock_phone_error',
      message: 'Mock phone call error for testing'
    }
  }
};

// Mock API functions
const mockWebCall = async () => {
  await simulateNetworkDelay();
  const isSuccess = Math.random() > 0.2;
  if (isSuccess) {
    return MOCK_RESPONSES.web_call.success;
  } else {
    throw new Error(MOCK_RESPONSES.web_call.error.message);
  }
};

const mockPhoneCall = async (phoneNumber) => {
  await simulateNetworkDelay();
  const isSuccess = Math.random() > 0.1;
  if (isSuccess) {
    return {
      ...MOCK_RESPONSES.phone_call.success,
      phoneNumber
    };
  } else {
    throw new Error(MOCK_RESPONSES.phone_call.error.message);
  }
};

// Backend API functions
const backendWebCall = async (userInfo = {}) => {
  const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/web-call`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: JSON.stringify({
      userInfo
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result.data;
};

const backendPhoneCall = async (phoneNumber, userInfo = {}) => {
  const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/phone-call`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: JSON.stringify({
      phoneNumber,
      userInfo
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result.data;
};

// Main API functions with intelligent fallback logic
export const initiateWebCall = async (userInfo = {}) => {
  try {
    // First, try to open the OmniDimension voice widget directly
    if (isWidgetAvailable()) {
      const widgetOpened = openWidget();
      if (widgetOpened) {
        toast.success('Voice widget opened! You can now speak with Haven.');
        return { type: 'widget', message: 'Voice widget opened successfully' };
      }
    }

    // If widget is not available, try backend API call (real or mock)
    if (API_CONFIG.MOCK_MODE) {
      const result = await mockWebCall();
      return { type: 'mock', data: result };
    } else {
      try {
        const result = await backendWebCall(userInfo);
        
        // Check if backend returned a mock response
        if (result.mock) {
          console.log('Backend returned mock response');
          toast.success('Using fallback mode - OmniDimension API unavailable');
        }
        
        return { type: 'backend', data: result };
      } catch (backendError) {
        console.log('Backend API failed, trying mock API as fallback...');
        const mockResult = await mockWebCall();
        return { type: 'mock_fallback', data: mockResult };
      }
    }
  } catch (error) {
    console.error('Web call error:', error);
    throw error;
  }
};

export const initiatePhoneCall = async (phoneNumber, userInfo = {}) => {
  try {
    if (API_CONFIG.MOCK_MODE) {
      const result = await mockPhoneCall(phoneNumber);
      return { type: 'mock', data: result };
    } else {
      try {
        const result = await backendPhoneCall(phoneNumber, userInfo);
        
        // Check if backend returned a mock response
        if (result.mock) {
          console.log('Backend returned mock phone call response');
          toast.success('Phone call initiated (mock mode) - OmniDimension API unavailable');
        }
        
        return { type: 'backend', data: result };
      } catch (backendError) {
        console.log('Backend API failed, trying mock API as fallback...');
        const mockResult = await mockPhoneCall(phoneNumber);
        return { type: 'mock_fallback', data: mockResult };
      }
    }
  } catch (error) {
    console.error('Phone call error:', error);
    throw error;
  }
};

// Widget management functions
export const openChatWidget = () => {
  try {
    // Check if OmniDimension widget is available
    const widget = document.querySelector('#omnidimension-web-widget-container') || 
                   document.querySelector('[data-omnidim-widget]');
    
    if (widget) {
      // Try to trigger widget open
      const widgetButton = widget.querySelector('button') || widget;
      if (widgetButton) {
        widgetButton.click();
        return true;
      }
    }
    
    // Alternative: try to call OmniDimension API directly
    if (window.omnidimensionWidget) {
      try {
        window.omnidimensionWidget.open();
        return true;
      } catch (error) {
        console.log('Failed to open widget via API');
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error opening chat widget:', error);
    return false;
  }
};

export const startVoiceWidget = () => {
  try {
    // Check if OmniDimension widget is available
    const widget = document.querySelector('#omnidimension-web-widget-container') || 
                   document.querySelector('[data-omnidim-widget]');
    
    if (widget) {
      // Try to trigger widget open
      const widgetButton = widget.querySelector('button') || widget;
      if (widgetButton) {
        widgetButton.click();
        return true;
      }
    }
    
    // Alternative: try to call OmniDimension API directly
    if (window.omnidimensionWidget) {
      try {
        window.omnidimensionWidget.open();
        return true;
      } catch (error) {
        console.log('Failed to open widget via API');
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error starting voice widget:', error);
    return false;
  }
};

export const checkWidgetStatus = () => {
  return {
    available: isWidgetAvailable(),
    message: isWidgetAvailable() 
      ? 'Voice widget is available' 
      : 'Voice widget is not available - using fallback options'
  };
};

// Check if OmniDimension widget is loaded
export const isOmniDimensionWidgetLoaded = () => {
  return !!document.querySelector('#omnidimension-web-widget-container') || 
         !!document.querySelector('[data-omnidim-widget]') ||
         !!window.omnidimensionWidget;
};

// Session management
export const getSessionStatus = async (sessionId) => {
  if (API_CONFIG.MOCK_MODE) {
    await simulateNetworkDelay();
    return {
      session_id: sessionId,
      status: 'active',
      duration: Math.floor(Math.random() * 1800) + 300, // 5-35 minutes
      counselor_name: 'Mock Counselor'
    };
  }
  
  try {
    const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/web-call/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Get session status error:', error);
    throw error;
  }
};

// Update session status
export const updateSessionStatus = async (sessionId, status, notes = '') => {
  try {
    const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/web-call/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      },
      body: JSON.stringify({
        sessionId,
        status,
        notes
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Update session status error:', error);
    throw error;
  }
};

// End session
export const endSession = async (sessionId, outcome = 'completed', notes = '') => {
  try {
    const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/web-call/end`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      },
      body: JSON.stringify({
        sessionId,
        outcome,
        notes
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('End session error:', error);
    throw error;
  }
};

// Emergency contact information
export const getEmergencyContacts = async () => {
  try {
    const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/phone-call/emergency-contacts`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Get emergency contacts error:', error);
    // Return fallback contacts if API fails
    return {
      national_crisis_line: {
        number: '1-800-273-8255',
        name: 'National Suicide Prevention Lifeline',
        available: '24/7'
      },
      crisis_text_line: {
        number: '741741',
        name: 'Crisis Text Line',
        available: '24/7'
      },
      emergency: {
        number: '911',
        name: 'Emergency Services',
        available: '24/7'
      }
    };
  }
};

// User authentication functions
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    const result = await response.json();
    if (result.token) {
      localStorage.setItem('token', result.token);
    }
    return result;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const result = await response.json();
    if (result.token) {
      localStorage.setItem('token', result.token);
    }
    return result;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await fetch(`${API_CONFIG.BACKEND_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('token');
  }
};

// Configuration export
export const getApiConfig = () => ({
  ...API_CONFIG,
  isMockMode: API_CONFIG.MOCK_MODE
}); 