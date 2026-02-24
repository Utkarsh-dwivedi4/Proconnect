import React from 'react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div>
      {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`}>⭐</span>)}
      {halfStar && <span key="half">🌟</span>} {/* Using a different emoji for half */}
      {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`}>☆</span>)}
    </div>
  );
};

export default StarRating;