import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import './ProfessionalCard.css';

// Helper function to get favorites from localStorage
const getFavorites = () => JSON.parse(localStorage.getItem('favorites') || '[]');

const ProfessionalCard = ({ professional }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if this professional is in favorites when the component mounts
  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.includes(professional.id));
  }, [professional.id]);

  const handleFavoriteToggle = (e) => {
    e.preventDefault(); // Prevent link navigation when clicking the heart
    e.stopPropagation(); // Stop the event from bubbling up to the parent Link
    
    const favorites = getFavorites();
    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter(id => id !== professional.id);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, professional.id];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="professional-card">
      <button className="favorite-btn" onClick={handleFavoriteToggle}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
      <img src={professional.image} alt={professional.name} className="professional-avatar" />
      <h3 className="professional-name">{professional.name}</h3>
      <p className="professional-specialty">{professional.specialty}</p>
      <div className="professional-rating">
        <StarRating rating={professional.rating} />
        <span className="rating-number">{professional.rating}</span>
      </div>
      <Link to={`/professional/${professional.id}`} className="view-profile-btn">
        View Profile
      </Link>
    </div>
  );
};

export default ProfessionalCard;