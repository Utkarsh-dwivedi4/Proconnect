import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const aboutSectionRef = useRef(null);

    const handleScrollToAbout = (e) => {
        e.preventDefault();
        aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleFindTalentClick = (e) => {
        e.preventDefault();
        navigate('/signin'); 
    };

    return (
        <div className="landing-page-wrapper">
            {/* The cursor elements and logic have been removed from here */}
            <header className="main-header">
                <a href="#top" className="logo">TalentCo</a>
                <nav className="main-nav">
                    <a href="#about">About Us</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>

            <div className="hero-container">
                <div className="hero-content">
                    <h1 className="hero-headline">Where Talent Meets Opportunity</h1>
                    <div className="button-wrapper">
                        <button onClick={handleScrollToAbout} className="hero-button btn-talent">
                            Enter
                        </button>
                    </div>
                </div>
            </div>

            <section id="about" ref={aboutSectionRef} className="content-section">
                <h2>About TalentCo</h2>
                <p>We are a passionate team dedicated to connecting exceptional talent with pioneering companies. Our mission is to bridge the gap between ambition and opportunity, creating powerful partnerships that drive innovation and growth.</p>
            </section>

            <section id="services" className="content-section bg-light">
                <h2>Our Services</h2>
                <p>From permanent placements to contract staffing and executive searches, we offer a comprehensive suite of recruitment services. Our expert consultants leverage cutting-edge technology and a vast network to find the perfect match.</p>
            </section>

            <section id="contact" className="cta-section">
                <h2>Ready to Find Your Next Star?</h2>
                <p>Let's build your dream team together. Click the button below to start your search and discover the best talent in the industry.</p>
                <a href="/signin" onClick={handleFindTalentClick} className="hero-button btn-talent">FIND TALENT</a>
            </section>
        </div>
    );
};

export default LandingPage;