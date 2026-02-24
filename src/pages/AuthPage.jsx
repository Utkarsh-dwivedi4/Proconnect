import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signin'); // 'signin', 'signup', or 'admin'
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  // The hardcoded list of valid admin users
  const validAdmins = {
    "2400032152@kluniversity.in": "Aditya",
    "2400032152@kluniversity.in": "Aditya",
    "2400032152@kluniversity.in": "Aditya" // Note: As per your request, password for this user is 'SA'
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on new input
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' }); // Reset form
    setError('');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === formData.email)) {
      setError('A user with this email already exists. Please sign in.');
      return;
    }
    const newUser = { name: formData.name, email: formData.email, password: formData.password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert(`Sign up successful! Welcome, ${newUser.name}.`);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    if (user) {
      alert(`Welcome back, ${user.name}!`);
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (validAdmins[formData.email] && validAdmins[formData.email] === formData.password) {
      // Store admin session
      localStorage.setItem('currentAdmin', JSON.stringify({ 
        email: formData.email, 
        isAdmin: true 
      }));
      alert('Admin login successful. Access granted.');
      navigate('/admin-dashboard');
    } else {
      setError('Invalid admin credentials. Access denied.');
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-box">
        <div className="auth-tabs">
          <button onClick={() => handleTabClick('signin')} className={activeTab === 'signin' ? 'active' : ''}>Sign In</button>
          <button onClick={() => handleTabClick('signup')} className={activeTab === 'signup' ? 'active' : ''}>Sign Up</button>
          <button onClick={() => handleTabClick('admin')} className={activeTab === 'admin' ? 'active' : ''}>Admin</button>
        </div>
        
        <div className="form-content">
          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn}>
              <h2>Client Sign In</h2>
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-btn">Sign In</button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp}>
              <h2>Create Your Account</h2>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-btn">Sign Up</button>
            </form>
          )}

          {/* Admin Login Form */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminLogin}>
              <h2>Admin Access</h2>
              <input type="email" name="email" placeholder="Admin Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Admin Password" value={formData.password} onChange={handleChange} required />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-btn">Login as Admin</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;    