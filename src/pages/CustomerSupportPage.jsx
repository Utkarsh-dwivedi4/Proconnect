import React, { useState } from 'react';
import './CustomerSupportPage.css';

const CustomerSupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the data to a server
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
  };

  return (
    <div className="support-container">
      <div className="support-content">
        <div className="support-header">
          <h1>Customer Support</h1>
          <p>We're here to help! Get in touch with our support team.</p>
        </div>

        <div className="support-main">
          <div className="support-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email Us</h3>
              <p>support@talentco.com</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Call Us</h3>
              <p>1-800-TALENTCO</p>
            </div>
            <div className="info-card">
              <div className="info-icon">⏰</div>
              <h3>Business Hours</h3>
              <p>Monday - Friday<br />9:00 AM - 6:00 PM EST</p>
            </div>
          </div>

          <div className="support-form-container">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="support-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="account">Account Issue</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Brief description of your issue"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Please provide details about your question or issue..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I contact a professional?</h3>
              <p>Click on a professional's profile and use the "Contact" button to send them a message.</p>
            </div>
            <div className="faq-item">
              <h3>Can I save professionals to favorites?</h3>
              <p>Yes! Click the heart icon on any professional's card to add them to your favorites list.</p>
            </div>
            <div className="faq-item">
              <h3>How do I update my profile?</h3>
              <p>Go to your dashboard and click on "Edit Profile" to update your information.</p>
            </div>
            <div className="faq-item">
              <h3>What if I forgot my password?</h3>
              <p>Use the "Forgot Password" link on the sign-in page to reset your password.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportPage;