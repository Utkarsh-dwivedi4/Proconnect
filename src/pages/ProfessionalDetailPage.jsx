import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { professionals } from '../data';
import StarRating from '../components/StarRating';
import './ProfessionalDetailPage.css';

const ProfessionalDetailPage = () => {
  const { id } = useParams();
  const professional = professionals.find((p) => p.id === parseInt(id));

  if (!professional) {
    return (
      <div className="detail-container not-found">
        <h2>Professional Not Found</h2>
        <Link to="/">Go back to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="profile-card-large">
        <div className="profile-left-column">
          <img src={professional.image} alt={professional.name} className="profile-avatar-large" />
          <h1 className="profile-name">{professional.name}</h1>
          <p className="profile-specialty">{professional.specialty}</p>
          <div className="profile-rating-large">
            <StarRating rating={professional.rating} />
            <span className="rating-number-large">{professional.rating}</span>
          </div>
          {/* Change the button to a Link */}
          <Link to={`/contact/${professional.id}`} className="hire-me-btn">
            Hire Me
          </Link>
        </div>
        <div className="profile-right-column">
          <h2>About Me</h2>
          <p className="profile-bio">{professional.bio}</p>

          <h2>Skills</h2>
          <div className="skills-container">
            {professional.skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetailPage;