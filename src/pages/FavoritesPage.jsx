import React, { useState, useEffect } from 'react';
import { professionals } from '../data';
import ProfessionalCard from '../components/ProfessionalCard';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const [favoriteProfessionals, setFavoriteProfessionals] = useState([]);

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favorites = professionals.filter(p => favoriteIds.includes(p.id));
    setFavoriteProfessionals(favorites);
  }, []);

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Your Favorite Professionals</h1>
      {favoriteProfessionals.length > 0 ? (
        <div className="professionals-grid">
          {favoriteProfessionals.map((pro) => (
            <ProfessionalCard key={pro.id} professional={pro} />
          ))}
        </div>
      ) : (
        <p className="no-favorites-message">
          You haven't added any favorites yet. Click the heart icon on a professional's card to save them here.
        </p>
      )}
    </div>
  );
};

export default FavoritesPage;