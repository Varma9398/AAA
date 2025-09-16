import React from 'react';
import { useCredits } from '../hooks/useCredits';

interface HeaderProps {
  onSignIn?: () => void;
  showCredits?: boolean;
  onBackToHome?: () => void;
}

export function Header({ onSignIn, showCredits, onBackToHome }: HeaderProps) {
  const { creditData } = useCredits();

  const getCreditDisplayClass = () => {
    if (creditData.creditsRemaining === 0) return 'credit-display no-credits';
    if (creditData.creditsRemaining <= 3) return 'credit-display low-credits';
    return 'credit-display';
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