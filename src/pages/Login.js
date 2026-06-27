import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Hardcoded credentials check
      if (email === 'admin@gmail.com' && password === 'admin12345') {
        // Set mock user data
        const mockUser = {
          id: 1,
          name: 'Admin',
          email: 'admin@gmail.com',
          balance: 0,
          card_blocked: false
        };
        
        localStorage.setItem('adminToken', 'mock-token-12345');
        localStorage.setItem('adminUser', JSON.stringify(mockUser));
        
        toast.success('Welcome back, Admin!');
        navigate('/');
      } else {
        setError('Invalid email or password. Use admin@gmail.com / admin12345');
        toast.error('Invalid credentials');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1> NFC Bus</h1>
        <p className="subtitle">Admin Login</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter you email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
}