import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './PopularCategories.css';

const categories = [
    { name: 'Graphic Design', icon: '🎨' },
    { name: 'Web Development', icon: '💻' },
    { name: 'Writing & Translation', icon: '✍️' },
    { name: 'Digital Marketing', icon: '📈' },
    { name: 'Video & Animation', icon: '🎬' },
    { name: 'Music & Audio', icon: '🎵' },
    { name: 'Business Consulting', icon: '💼' },
    { name: 'Photography', icon: '📸' },
];

const PopularCategories = () => {
  return (
    <div className="categories-container">
      <h1 className="categories-title">Find the talent you need</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          // Wrap the card in a Link component
          <Link to={`/category/${category.name}`} key={category.name} className="category-link">
            <div className="category-card">
              <span className="category-icon">{category.icon}</span>
              <h3 className="category-name">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;