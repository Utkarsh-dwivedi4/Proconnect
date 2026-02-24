import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionals } from '../data';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProfessionals: 0,
    totalFavorites: 0,
    totalCategories: 0,
    totalMessages: 0
  });
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'users', 'professionals', 'messages'

  useEffect(() => {
    // Check if user is admin
    const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    if (!currentAdmin || !currentAdmin.isAdmin) {
      navigate('/signin');
      return;
    }
    setAdminUser(currentAdmin);

    // Load statistics
    loadStatistics();
    loadUsers();
    loadMessages();
  }, [navigate]);

  const loadStatistics = () => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const categories = [...new Set(professionals.map(p => p.category))];
    const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');

    setStats({
      totalUsers: allUsers.length,
      totalProfessionals: professionals.length,
      totalFavorites: favorites.length,
      totalCategories: categories.length,
      totalMessages: allMessages.length
    });
  };

  const loadUsers = () => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(allUsers);
  };

  const loadMessages = () => {
    const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    // Sort messages by timestamp, newest first
    const sortedMessages = allMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setMessages(sortedMessages);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentAdmin');
    navigate('/signin');
  };

  const handleDeleteUser = (userEmail) => {
    if (window.confirm(`Are you sure you want to delete user ${userEmail}?`)) {
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = allUsers.filter(u => u.email !== userEmail);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      loadUsers();
      loadStatistics();
    }
  };

  const handleDeleteMessage = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
      const updatedMessages = allMessages.filter(m => m.id !== messageId);
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      loadMessages();
      loadStatistics();
    }
  };

  if (!adminUser) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div className="admin-user-info">
            <span className="admin-email">{adminUser.email}</span>
            <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
          </div>
        </div>
      </div>

      <div className="admin-nav-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Users ({stats.totalUsers})
        </button>
        <button 
          className={activeTab === 'professionals' ? 'active' : ''} 
          onClick={() => setActiveTab('professionals')}
        >
          Professionals ({stats.totalProfessionals})
        </button>
        <button 
          className={activeTab === 'messages' ? 'active' : ''} 
          onClick={() => setActiveTab('messages')}
        >
          Messages ({stats.totalMessages})
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <h2>System Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-value">{stats.totalUsers}</div>
                <div className="stat-label">Total Users</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💼</div>
                <div className="stat-value">{stats.totalProfessionals}</div>
                <div className="stat-label">Total Professionals</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-value">{stats.totalFavorites}</div>
                <div className="stat-label">Total Favorites</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📁</div>
                <div className="stat-value">{stats.totalCategories}</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💬</div>
                <div className="stat-value">{stats.totalMessages}</div>
                <div className="stat-label">Total Messages</div>
              </div>
            </div>

            <div className="system-info">
              <h3>System Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Platform:</strong> TalentCo
                </div>
                <div className="info-item">
                  <strong>Status:</strong> <span className="status-active">Active</span>
                </div>
                <div className="info-item">
                  <strong>Admin Access:</strong> Enabled
                </div>
                <div className="info-item">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h2>Registered Users</h2>
            {users.length > 0 ? (
              <div className="users-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteUser(user.email)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <p>No registered users found.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'professionals' && (
          <div className="professionals-section">
            <h2>All Professionals</h2>
            <div className="professionals-grid">
              {professionals.map(pro => (
                <div key={pro.id} className="professional-card">
                  <img src={pro.image} alt={pro.name} className="pro-avatar" />
                  <div className="pro-info">
                    <h3>{pro.name}</h3>
                    <p className="pro-category">{pro.category}</p>
                    <p className="pro-specialty">{pro.specialty}</p>
                    <div className="pro-rating">⭐ {pro.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="messages-section">
            <h2>All Messages</h2>
            {messages.length > 0 ? (
              <div className="messages-list">
                {messages.map(msg => (
                  <div key={msg.id} className="message-card">
                    <div className="message-header">
                      <div className="message-sender-info">
                        <div className="message-avatar-wrapper">
                          <img 
                            src={msg.professionalImage} 
                            alt={msg.professionalName} 
                            className="message-professional-avatar" 
                          />
                        </div>
                        <div className="message-details">
                          <div className="message-title">
                            <strong>{msg.senderName}</strong> 
                            <span className="message-arrow">→</span> 
                            <strong>{msg.professionalName}</strong>
                          </div>
                          <div className="message-meta">
                            <span className="message-email">{msg.senderEmail}</span>
                            <span className="message-separator">•</span>
                            <span className="message-date">{msg.date} at {msg.time}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteMessage(msg.id)}
                        title="Delete message"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="message-content">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No messages found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;