
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [localQuery, setLocalQuery] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.isLoggedIn) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('favorites'); 
    setUser(null);
    navigate('/signin');
    window.location.reload();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      onSearch(localQuery.trim());
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo">
          ProConnect
        </Link>
        
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input 
            type="search" 
            placeholder="Search by name, skill, or specialty..." 
            className="search-input"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
          />
        </form>

        <nav className="header-nav">
          <Link to="/support" className="support-icon-link" title="Customer Support">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
            </svg>
          </Link>
          {user ? (
            <>
              <Link to="/favorites" className="header-link">My Favorites</Link>
              {/* Turn the welcome message into a link */}
              <Link to="/dashboard" className="header-link welcome-message">
                Welcome, {user.name}
              </Link>
              <button onClick={handleSignOut} className="header-button signout">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/signin" className="header-button signin">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;