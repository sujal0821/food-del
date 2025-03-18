import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

/**
 * Component for testing API connectivity
 */
const ApiHealthCheck = () => {
  const [status, setStatus] = useState('Checking...');
  const [error, setError] = useState(null);
  const [details, setDetails] = useState(null);

  const checkHealth = async () => {
    setStatus('Checking...');
    setError(null);
    
    try {
      // First try the root endpoint
      const response = await axios.get(`${API_BASE_URL}/`);
      setStatus('Connected');
      setDetails({
        message: response.data,
        endpoint: `${API_BASE_URL}/`
      });
    } catch (rootError) {
      console.error("Root endpoint check failed:", rootError);
      
      // If that fails, try the food list endpoint
      try {
        const foodResponse = await axios.get(`${API_BASE_URL}/api/food/list`);
        setStatus('Connected (food list)');
        setDetails({
          count: foodResponse.data?.data?.length || 'unknown',
          endpoint: `${API_BASE_URL}/api/food/list`
        });
      } catch (foodError) {
        console.error("Food list check failed:", foodError);
        setStatus('Failed');
        setError({
          root: rootError.message,
          food: foodError.message
        });
      }
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      padding: '10px', 
      background: status === 'Connected' || status === 'Connected (food list)' ? '#e6ffe6' : '#ffe6e6', 
      border: '1px solid #ccc', 
      borderRadius: '5px',
      zIndex: 1000
    }}>
      <h3>API Status: {status}</h3>
      {details && (
        <div>
          <pre>{JSON.stringify(details, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div style={{ color: 'red' }}>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
      <button onClick={checkHealth}>Check Again</button>
    </div>
  );
};

export default ApiHealthCheck; 