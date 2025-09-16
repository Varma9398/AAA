import React, { useEffect, useState } from 'react';
import { useCredits } from '../hooks/useCredits';

interface HeaderProps {
  onSignIn?: () => void;
  showCredits?: boolean;
  onBackToHome?: () => void;
}

export function Header({ onSignIn, showCredits, onBackToHome }: HeaderProps) {
  const { creditData } = useCredits();
  const [isUpdating, setIsUpdating] = useState(false);
  const [prevCredits, setPrevCredits] = useState(creditData.creditsRemaining);

  // Animate when credits change
  useEffect(() => {
    if (prevCredits !== creditData.creditsRemaining && showCredits) {
      setIsUpdating(true);
      const timer = setTimeout(() => setIsUpdating(false), 600);
      setPrevCredits(creditData.creditsRemaining);
      return () => clearTimeout(timer);
    }
  }, [creditData.creditsRemaining, prevCredits, showCredits]);

  const getCreditDisplayClass = () => {
    let baseClass;
    if (creditData.creditsRemaining === 0) baseClass = 'credit-display no-credits';
    else if (creditData.creditsRemaining <= 3) baseClass = 'credit-display low-credits';
    else baseClass = 'credit-display';
    
    return isUpdating ? `${baseClass} credit-updating` : baseClass;
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <a className="logo" href="/">cloud</a>
          <div className="nav-buttons">
            {showCredits && (
              <div className={getCreditDisplayClass()}>
                <span className="credit-icon"></span>
                <span>{creditData.creditsRemaining} Credits</span>
              </div>
            )}
            {onBackToHome && (
              <button className="btn btn-outline" onClick={onBackToHome}>
                Back to Home
              </button>
            )}
            {onSignIn && (
              <button className="btn btn-outline" onClick={onSignIn}>
                Sign In
              </button>
            )}
            <button className="btn btn-solid">
              {showCredits ? 'Account' : 'Get Started'}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}