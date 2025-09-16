import React from 'react';
import { useCredits } from '../hooks/useCredits';

export function CreditInfo() {
  const { creditData, DAILY_CREDIT_LIMIT } = useCredits();

  const getCreditInfoClass = () => {
    return creditData.creditsRemaining === 0 ? 'credit-info no-credits' : 'credit-info';
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