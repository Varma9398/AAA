import React, { useEffect, useState } from 'react';
import { useCredits } from '../hooks/useCredits';

export function CreditInfo() {
  const { creditData, DAILY_CREDIT_LIMIT } = useCredits();
  const [isUpdating, setIsUpdating] = useState(false);
  const [prevCredits, setPrevCredits] = useState(creditData.creditsRemaining);

  // Animate when credits change
  useEffect(() => {
    if (prevCredits !== creditData.creditsRemaining) {
      setIsUpdating(true);
      const timer = setTimeout(() => setIsUpdating(false), 800);
      setPrevCredits(creditData.creditsRemaining);
      return () => clearTimeout(timer);
    }
  }, [creditData.creditsRemaining, prevCredits]);

  const getCreditInfoClass = () => {
    let baseClass = creditData.creditsRemaining === 0 ? 'credit-info no-credits' : 'credit-info';
    return isUpdating ? `${baseClass} credit-updating` : baseClass;
  };

  return (
    <div className={getCreditInfoClass()}>
      <div className="credit-stats">
        <div className="credit-item">
          <div className="credit-number">{creditData.creditsRemaining}</div>
          <div className="credit-label">Credits Remaining</div>
        </div>
        <div className="credit-item">
          <div className="credit-number">{creditData.creditsUsed}</div>
          <div className="credit-label">Used Today</div>
        </div>
        <div className="credit-item">
          <div className="credit-number">{DAILY_CREDIT_LIMIT}</div>
          <div className="credit-label">Daily Limit</div>
        </div>
      </div>
    </div>
  );
}