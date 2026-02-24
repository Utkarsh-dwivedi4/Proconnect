import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { professionals } from '../data';
import './DashboardPage.css';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [recentFavorites, setRecentFavorites] = useState([]);

  useEffect(() => {
    // Get user info
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    }

    // Get recent favorites
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Get the last 4 favorited professionals
    const recentFavoriteIds = favoriteIds.slice(-4).reverse();
    const favoriteProfiles = professionals.filter(p => recentFavoriteIds.includes(p.id));
    setRecentFavorites(favoriteProfiles);
  }, []);

  if (!user) {
    return <p>Loading dashboard...</p>; // Or a redirect to login
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-welcome">Welcome back, {user.name}!</h1>
      <p className="dashboard-subtitle">Here's a quick look at your recent activity.</p>
      
      <div className="dashboard-main-content">
        <h2 className="section-title">Recently Favorited Professionals</h2>
        {recentFavorites.length > 0 ? (
          <div className="recent-favorites-grid">
            {recentFavorites.map(pro => (
              <Link to={`/professional/${pro.id}`} key={pro.id} className="mini-profile-card">
                <img src={pro.image} alt={pro.name} className="mini-avatar" />
                <h3 className="mini-name">{pro.name}</h3>
                <p className="mini-specialty">{pro.specialty}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-favorites-dashboard">
            <p>You haven't favorited anyone yet.</p>
            <Link to="/" className="find-talent-link">Find Talent Now</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;