// LocalStorage utility functions for the application

export interface LandingPageState {
  currentIndex: number;
  timestamp: string;
}

export interface UserPreferences {
  styleIntensity: 'subtle' | 'moderate' | 'strong' | 'extreme';
  aspectRatio: string;
  timestamp: string;
}

export interface ImageHistoryItem {
  id: string;
  url: string;
  prompt: string;
  timestamp: string;
  userId?: string;
}

export interface CreditData {
  date: string;
  creditsUsed: number;
  creditsRemaining: number;
}

// Storage keys
export const STORAGE_KEYS = {
  LANDING_PAGE_STATE: 'landingPageState',
  USER_PREFERENCES: 'userPreferences',
  IMAGE_HISTORY: 'imageHistory',
  PAPER_ART_CREDITS: 'paperArtCredits',
  USER_SESSION: 'userSession'
} as const;

// Generic localStorage utilities
export const storageUtils = {
  // Get item with type safety and error handling
  getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Failed to get ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  // Set item with error handling
  setItem<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Failed to set ${key} in localStorage:`, error);
      return false;
    }
  },

  // Remove item
  removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove ${key} from localStorage:`, error);
      return false;
    }
  },

  // Clear all app data
  clearAppData(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      storageUtils.removeItem(key);
    });
  },

  // Get storage usage info
  getStorageInfo(): { used: number; total: number; percentage: number } {
    let used = 0;
    const total = 5 * 1024 * 1024; // 5MB typical limit

    try {
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage.getItem(key)!.length + key.length;
        }
      }
    } catch (error) {
      console.error('Failed to calculate storage usage:', error);
    }

    return {
      used,
      total,
      percentage: Math.round((used / total) * 100)
    };
  }
};

// Specific utility functions
export const landingPageStorage = {
  getState(): LandingPageState | null {
    return storageUtils.getItem(STORAGE_KEYS.LANDING_PAGE_STATE, null);
  },

  setState(state: LandingPageState): boolean {
    return storageUtils.setItem(STORAGE_KEYS.LANDING_PAGE_STATE, state);
  }
};

export const userPreferencesStorage = {
  getPreferences(): UserPreferences | null {
    return storageUtils.getItem(STORAGE_KEYS.USER_PREFERENCES, null);
  },

  setPreferences(preferences: UserPreferences): boolean {
    return storageUtils.setItem(STORAGE_KEYS.USER_PREFERENCES, preferences);
  }
};

export const imageHistoryStorage = {
  getHistory(): ImageHistoryItem[] {
    return storageUtils.getItem(STORAGE_KEYS.IMAGE_HISTORY, []);
  },

  setHistory(history: ImageHistoryItem[]): boolean {
    return storageUtils.setItem(STORAGE_KEYS.IMAGE_HISTORY, history);
  },

  addImage(image: ImageHistoryItem): boolean {
    const history = this.getHistory();
    const updatedHistory = [image, ...history];
    return this.setHistory(updatedHistory);
  },

  clearHistory(): boolean {
    return storageUtils.removeItem(STORAGE_KEYS.IMAGE_HISTORY);
  }
};

export const creditStorage = {
  getCredits(): CreditData | null {
    return storageUtils.getItem(STORAGE_KEYS.PAPER_ART_CREDITS, null);
  },

  setCredits(credits: CreditData): boolean {
    return storageUtils.setItem(STORAGE_KEYS.PAPER_ART_CREDITS, credits);
  }
};