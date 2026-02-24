import React from 'react';
import { useParams } from 'react-router-dom';
import { professionals } from '../data';
import ProfessionalCard from '../components/ProfessionalCard';
import './ProfessionalsListPage.css';

const ProfessionalsListPage = () => {
  const { categoryName } = useParams(); // Get category from URL
  const filteredProfessionals = professionals.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase().replace(/%20/g, " ")
  );

  return (
    <div className="professionals-list-container">
      <h1 className="professionals-list-title">Showing Professionals for: {categoryName.replace(/%20/g, " ")}</h1>
      <div className="professionals-grid">
        {filteredProfessionals.length > 0 ? (
          filteredProfessionals.map((pro) => (
            <ProfessionalCard key={pro.id} professional={pro} />
          ))
        ) : (
          <p className="no-professionals-message">No professionals found in this category yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfessionalsListPage;