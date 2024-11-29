import React from 'react';
import './Footer.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Contact section */}
      <div className="contact-info">
        <h3>Contact Us</h3>
        <p>Email: info@clinic.com</p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Clinic St, Health City, HC 12345</p>
      </div>

      {/* Social media links */}
      <div className="social-media">
        <h3>Follow Us</h3>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
        </a>
        <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
        </a>
      </div>

      {/* Right-aligned developer info */}
      <div className="developer-info">
        <p>Developed by Paansuli services.</p>
      </div>

      {/* Centered copyright text */}
      <div className="footer-content">
        <p>&copy; 2024 All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
