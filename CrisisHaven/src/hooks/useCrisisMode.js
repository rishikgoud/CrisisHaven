import { useContext } from 'react';
import { CrisisContext } from '../context/CrisisContext';

export const useCrisisMode = () => {
  const context = useContext(CrisisContext);
  
  if (!context) {
    return {
      isCrisisMode: false,
      startCrisisMode: () => {},
      endCrisisMode: () => {},
      riskLevel: 'low',
      setRiskLevel: () => {},
    };
  }

  const { isCrisisMode, riskLevel, actions } = context;

  return {
    isCrisisMode,
    startCrisisMode: actions.startCrisisMode,
    endCrisisMode: actions.endCrisisMode,
    riskLevel,
    setRiskLevel: actions.setRiskLevel,
  };
}; 