import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CrisisContext = createContext();

const initialState = {
  isCrisisMode: false,
  isVoiceActive: false,
  currentSession: null,
  riskLevel: 'low', // low, medium, high, critical
  emergencyContacts: [],
  userLocation: null,
  isConnected: false,
  sessionHistory: [],
  preferences: {
    voiceEnabled: true,
    notifications: true,
    highContrast: false,
    autoSave: true,
  }
};

const crisisReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CRISIS_MODE':
      return {
        ...state,
        isCrisisMode: action.payload,
      };
    
    case 'SET_VOICE_ACTIVE':
      return {
        ...state,
        isVoiceActive: action.payload,
      };
    
    case 'START_SESSION':
      return {
        ...state,
        currentSession: {
          id: Date.now(),
          startTime: new Date().toISOString(),
          status: 'active',
          ...action.payload,
        },
      };
    
    case 'END_SESSION':
      return {
        ...state,
        currentSession: state.currentSession ? {
          ...state.currentSession,
          endTime: new Date().toISOString(),
          status: 'ended',
        } : null,
        sessionHistory: state.currentSession 
          ? [...state.sessionHistory, state.currentSession]
          : state.sessionHistory,
      };
    
    case 'SET_RISK_LEVEL':
      return {
        ...state,
        riskLevel: action.payload,
      };
    
    case 'SET_EMERGENCY_CONTACTS':
      return {
        ...state,
        emergencyContacts: action.payload,
      };
    
    case 'SET_USER_LOCATION':
      return {
        ...state,
        userLocation: action.payload,
      };
    
    case 'SET_CONNECTION_STATUS':
      return {
        ...state,
        isConnected: action.payload,
      };
    
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      };
    
    case 'ADD_SESSION_MESSAGE':
      if (state.currentSession) {
        return {
          ...state,
          currentSession: {
            ...state.currentSession,
            messages: [
              ...(state.currentSession.messages || []),
              action.payload,
            ],
          },
        };
      }
      return state;
    
    default:
      return state;
  }
};

export const CrisisProvider = ({ children }) => {
  const [state, dispatch] = useReducer(crisisReducer, initialState);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('crisisHavenPreferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('crisisHavenPreferences', JSON.stringify(state.preferences));
  }, [state.preferences]);

  // Get user location if permission granted
  useEffect(() => {
    if (navigator.geolocation && state.preferences.locationEnabled) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch({
            type: 'SET_USER_LOCATION',
            payload: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        (error) => {
          console.log('Location permission denied or error:', error);
        }
      );
    }
  }, [state.preferences.locationEnabled]);

  const value = {
    ...state,
    dispatch,
    actions: {
      startCrisisMode: () => dispatch({ type: 'SET_CRISIS_MODE', payload: true }),
      endCrisisMode: () => dispatch({ type: 'SET_CRISIS_MODE', payload: false }),
      startVoiceSession: (sessionData) => {
        dispatch({ type: 'START_SESSION', payload: sessionData });
        dispatch({ type: 'SET_VOICE_ACTIVE', payload: true });
      },
      endVoiceSession: () => {
        dispatch({ type: 'END_SESSION' });
        dispatch({ type: 'SET_VOICE_ACTIVE', payload: false });
      },
      setRiskLevel: (level) => dispatch({ type: 'SET_RISK_LEVEL', payload: level }),
      addMessage: (message) => dispatch({ type: 'ADD_SESSION_MESSAGE', payload: message }),
      updatePreferences: (preferences) => dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences }),
      setEmergencyContacts: (contacts) => dispatch({ type: 'SET_EMERGENCY_CONTACTS', payload: contacts }),
      setConnectionStatus: (status) => dispatch({ type: 'SET_CONNECTION_STATUS', payload: status }),
    },
  };

  return (
    <CrisisContext.Provider value={value}>
      {children}
    </CrisisContext.Provider>
  );
};

export const useCrisis = () => {
  const context = useContext(CrisisContext);
  if (!context) {
    throw new Error('useCrisis must be used within a CrisisProvider');
  }
  return context;
};

export { CrisisContext }; 