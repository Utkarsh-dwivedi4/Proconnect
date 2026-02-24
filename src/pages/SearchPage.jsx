import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { professionals } from '../data';
import ProfessionalCard from '../components/ProfessionalCard';
import './SearchPage.css';

// A custom hook to parse query params from URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery();
  const searchQuery = query.get('q');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const results = professionals.filter(p => 
        p.name.toLowerCase().includes(lowercasedQuery) ||
        p.specialty.toLowerCase().includes(lowercasedQuery) ||
        p.category.toLowerCase().includes(lowercasedQuery) ||
        p.skills.some(skill => skill.toLowerCase().includes(lowercasedQuery))
      );
      setSearchResults(results);
    }
  }, [searchQuery]);

  return (
    <div className="search-container">
      <h1 className="search-title">
        Search Results for: <span className="search-query-text">"{searchQuery}"</span>
      </h1>
      {searchResults.length > 0 ? (
        <div className="professionals-grid">
          {searchResults.map((pro) => (
            <ProfessionalCard key={pro.id} professional={pro} />
          ))}
        </div>
      ) : (
        <p className="no-search-results-message">
          No professionals found matching your search. Try another term.
        </p>
      )}
    </div>
  );
};

export default SearchPage;