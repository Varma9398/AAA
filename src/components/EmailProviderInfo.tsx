import React, { useState } from 'react';
import { EmailValidator } from '../lib/emailValidator';
import { Info } from 'lucide-react';

export function EmailProviderInfo() {
  const [showInfo, setShowInfo] = useState(false);
  const allowedDomains = EmailValidator.getAllowedDomains();

  return (
    <div style={{ marginBottom: '15px' }}>
      <button
        type="button"
        onClick={() => setShowInfo(!showInfo)}
        style={{
          background: 'none',
          border: 'none',
          color: '#3498db',
          cursor: 'pointer',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '0'
        }}
      >
        <Info size={14} />
        {showInfo ? 'Hide' : 'Show'} allowed email providers
      </button>
      
      {showInfo && (
        <div style={{
          marginTop: '10px',
          padding: '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '12px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>✅ Allowed Email Providers:</h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
            gap: '5px',
            marginBottom: '10px'
          }}>
            {allowedDomains.map(domain => (
              <span key={domain} style={{
                padding: '2px 6px',
                backgroundColor: '#e3f2fd',
                borderRadius: '4px',
                fontSize: '11px',
                color: '#1976d2'
              }}>
                {domain}
              </span>
            ))}
          </div>
          
          <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '8px' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#e74c3c', fontSize: '11px' }}>❌ Not Allowed:</h4>
            <ul style={{ margin: '0', paddingLeft: '15px', fontSize: '11px', color: '#6c757d' }}>
              <li>Temporary email services (10minutemail, tempmail, etc.)</li>
              <li>Disposable email providers</li>
              <li>Unknown or suspicious domains</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}