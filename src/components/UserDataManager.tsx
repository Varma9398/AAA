import React, { useState, useEffect } from 'react';
import { storageUtils, STORAGE_KEYS } from '../lib/localStorage';

export function UserDataManager() {
  const [userData, setUserData] = useState<Record<string, any>>({});
  const [showData, setShowData] = useState(false);
  const [storageInfo, setStorageInfo] = useState({ used: 0, total: 0, percentage: 0 });

  const loadUserData = () => {
    const data = storageUtils.getAllUserData();
    setUserData(data);
    const info = storageUtils.getStorageInfo();
    setStorageInfo(info);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleClearUserData = () => {
    if (window.confirm('Are you sure you want to delete user-specific data? This will remove image history, credits, and session data.')) {
      storageUtils.clearUserData();
      loadUserData();
      alert('User data has been deleted.');
    }
  };

  const handleFactoryReset = () => {
    if (window.confirm('Are you sure you want to delete ALL data? This will remove everything including preferences and cannot be undone.')) {
      storageUtils.factoryReset();
      loadUserData();
      alert('All data has been deleted.');
    }
  };

  const handleClearSpecificData = (key: string) => {
    if (window.confirm(`Are you sure you want to delete ${key} data?`)) {
      storageUtils.removeItem(key);
      loadUserData();
      alert(`${key} data has been deleted.`);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '2px solid #e74c3c', 
      borderRadius: '10px',
      backgroundColor: '#fff5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ color: '#e74c3c', marginBottom: '20px' }}>🗑️ User Data Management</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Storage Usage</h3>
        <p>Used: {formatSize(storageInfo.used)} / {formatSize(storageInfo.total)} ({storageInfo.percentage}%)</p>
        <div style={{ 
          width: '100%', 
          height: '20px', 
          backgroundColor: '#ecf0f1', 
          borderRadius: '10px', 
          overflow: 'hidden' 
        }}>
          <div style={{ 
            width: `${storageInfo.percentage}%`, 
            height: '100%', 
            backgroundColor: storageInfo.percentage > 80 ? '#e74c3c' : '#3498db',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={handleClearUserData}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f39c12',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Clear User Data Only
          </button>
          
          <button 
            onClick={handleFactoryReset}
            style={{
              padding: '10px 20px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Factory Reset (All Data)
          </button>
          
          <button 
            onClick={() => setShowData(!showData)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {showData ? 'Hide' : 'Show'} Stored Data
          </button>
          
          <button 
            onClick={loadUserData}
            style={{
              padding: '10px 20px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Refresh Data
          </button>
        </div>
      </div>

      {showData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Stored Data by Category</h3>
          {Object.entries(userData).length === 0 ? (
            <p style={{ color: '#7f8c8d' }}>No data found in localStorage</p>
          ) : (
            Object.entries(userData).map(([category, data]) => (
              <div key={category} style={{ 
                margin: '10px 0', 
                padding: '15px', 
                border: '1px solid #bdc3c7', 
                borderRadius: '5px',
                backgroundColor: '#ecf0f1'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                    {category.replace(/_/g, ' ').toUpperCase()}
                  </h4>
                  <button
                    onClick={() => handleClearSpecificData(STORAGE_KEYS[category as keyof typeof STORAGE_KEYS])}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </div>
                <pre style={{ 
                  backgroundColor: '#fff', 
                  padding: '10px', 
                  borderRadius: '3px', 
                  overflow: 'auto',
                  maxHeight: '200px',
                  fontSize: '12px'
                }}>
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f6f3', borderRadius: '5px' }}>
        <h4 style={{ color: '#16a085' }}>📝 Data Storage Information</h4>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li><strong>Image History:</strong> Generated images, prompts, timestamps</li>
          <li><strong>Credits:</strong> Daily usage and remaining credits</li>
          <li><strong>Preferences:</strong> Style settings and aspect ratios</li>
          <li><strong>Landing State:</strong> Gallery viewing position</li>
          <li><strong>User Session:</strong> Login/session data (if any)</li>
        </ul>
        <p style={{ color: '#7f8c8d', fontSize: '14px', marginTop: '10px' }}>
          <strong>Note:</strong> All data is stored locally in the browser. Deleting emails from Supabase won't affect this data.
        </p>
      </div>
    </div>
  );
}