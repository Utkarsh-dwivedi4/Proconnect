import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { professionals } from '../data';
import './ContactPage.css';
import axios from "axios";

const ContactPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const professional = professionals.find((p) => p.id === parseInt(id));
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.length < 10) {
      alert('Please provide a more detailed message.');
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/messages`, {
        user_email: currentUser?.email || "anonymous@example.com",
        professional_id: professional.id,
        message: message
      });

      alert(`Message sent to ${professional.name} and saved in database!`);

      navigate(`/professional/${id}`);

    } catch (error) {
      console.error(error);
      alert("Error sending message");
    }
  };

  if (!professional) {
    return (
      <div className="contact-container not-found">
        <h2>Professional Not Found</h2>
        <Link to="/">Go back to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <div className="contact-form-box">
        <div className="contact-header">
          <img src={professional.image} alt={professional.name} className="contact-avatar" />
          <div>
            <p className="contacting-text">You are contacting</p>
            <h1 className="contact-name">{professional.name}</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="message" className="message-label">
            Your Message
          </label>

          <textarea
            id="message"
            className="message-textarea"
            rows="10"
            placeholder={`Hi ${professional.name}, I'm interested in working with you on a project...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="send-message-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;