import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { EmailValidator } from '../lib/emailValidator';
import { EmailProviderInfo } from './EmailProviderInfo';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Email validation on change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError('');
    
    if (newEmail.trim() && newEmail.includes('@')) {
      const validation = EmailValidator.validateEmail(newEmail);
      if (!validation.isValid || !validation.isAllowed) {
        setEmailError(validation.error || 'Invalid email address');
      }
    }
  };

  // Get input class based on email validation state
  const getEmailInputClass = () => {
    if (!email.trim()) return '';
    if (emailError) return 'input-error';
    
    const validation = EmailValidator.validateEmail(email);
    if (validation.isValid && validation.isAllowed) {
      return 'input-success';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setEmailError('');

    // Validate email before submitting
    const emailValidation = EmailValidator.validateEmail(email);
    if (!emailValidation.isValid || !emailValidation.isAllowed) {
      setEmailError(emailValidation.error || 'Invalid email address');
      setLoading(false);
      return;
    }

    try {
      let result;
      if (isLogin) {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }

      if (result.error) {
        setError(result.error.message);
      } else {
        onSuccess();
        onClose();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            disabled={loading}
            className={getEmailInputClass()}
          />
          {emailError && <div className="error-message" style={{ fontSize: '12px', marginTop: '5px' }}>{emailError}</div>}
          
          <div style={{ fontSize: '12px', color: '#666', marginTop: '5px', marginBottom: '15px' }}>
            ⚠️ Only Gmail, Outlook, iCloud, Yahoo, and AOL emails are allowed. Temporary emails are blocked.
          </div>
          
          <EmailProviderInfo />
          
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={loading || emailError !== ''}
          >
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <div className="tab-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </a>
        </div>
      </div>
    </div>
  );
}