import { useState, useEffect, useCallback } from 'react';
import type { CreditData } from '../types';

const DAILY_CREDIT_LIMIT = 10;
const CREDIT_COST_PER_IMAGE = 1;

// Credit update event system for real-time updates
const CREDIT_UPDATE_EVENT = 'creditUpdate';

class CreditEventManager {
  private listeners: Set<() => void> = new Set();

  addListener(callback: () => void) {
    this.listeners.add(callback);
  }

  removeListener(callback: () => void) {
    this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback());
  }
}

const creditEventManager = new CreditEventManager();

export function useCredits() {
  const [creditData, setCreditData] = useState<CreditData>({
    date: new Date().toDateString(),
    creditsUsed: 0,
    creditsRemaining: DAILY_CREDIT_LIMIT
  });

  const [timeUntilReset, setTimeUntilReset] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  // Function to load current credit data from localStorage
  const loadCreditData = useCallback(() => {
    const today = new Date().toDateString();
    const storedData = JSON.parse(localStorage.getItem('paperArtCredits') || '{}');
    
    // Reset credits if it's a new day
    if (storedData.date !== today) {
      const newData = {
        date: today,
        creditsUsed: 0,
        creditsRemaining: DAILY_CREDIT_LIMIT
      };
      localStorage.setItem('paperArtCredits', JSON.stringify(newData));
      setCreditData(newData);
    } else {
      setCreditData(storedData);
    }
  }, []);

  useEffect(() => {
    loadCreditData();
    const timer = setInterval(updateTimer, 1000);
    
    // Add listener for real-time updates
    creditEventManager.addListener(loadCreditData);
    
    return () => {
      clearInterval(timer);
      creditEventManager.removeListener(loadCreditData);
    };
  }, [loadCreditData]);

  function updateTimer() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    setTimeUntilReset({
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    });
    
    // Check if we've hit midnight and need to reset
    if (diff <= 0) {
      loadCreditData(); // Reload instead of full page refresh
      creditEventManager.notifyListeners();
    }
  }

  function deductCredit(): void {
    const newCreditsUsed = creditData.creditsUsed + CREDIT_COST_PER_IMAGE;
    const newData = {
      date: new Date().toDateString(),
      creditsUsed: newCreditsUsed,
      creditsRemaining: DAILY_CREDIT_LIMIT - newCreditsUsed
    };
    
    localStorage.setItem('paperArtCredits', JSON.stringify(newData));
    setCreditData(newData);
    
    // Notify all other components about the credit update
    creditEventManager.notifyListeners();
  }

  function hasCreditsRemaining(): boolean {
    return creditData.creditsRemaining > 0;
  }

  return {
    creditData,
    timeUntilReset,
    deductCredit,
    hasCreditsRemaining,
    DAILY_CREDIT_LIMIT,
    CREDIT_COST_PER_IMAGE
  };
}