import React, { useState, useEffect, useRef } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import gsap from 'gsap';
import './ContactUs.css';

/**
 * ContactUs Component - Handles contact information display and message form
 * Features GSAP animations for smooth transitions between sections
 */
const ContactUs = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Animation refs
  const heroRef = useRef(null);    // Hero section reference
  const cardsRef = useRef(null);   // Contact cards grid reference
  const formRef = useRef(null);    // Form section reference

  // Animation setup using GSAP
  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Set initial states for animation elements
    gsap.set([heroRef.current, cardsRef.current.children, formRef.current], {
      opacity: 0,
      y: 20
    });

    // Hero section animation
    tl.to(heroRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      autoAlpha: 1 // Combines opacity and visibility
    });

    // Contact cards staggered animation
    tl.to(cardsRef.current.children, {
      opacity: 1,
      y: 0,
      stagger: 0.15,    // 150ms between each card animation
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3'); // Overlap with previous animation

    // Form section animation
    tl.to(formRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      autoAlpha: 1
    }, '-=0.3');

  }, []); // Empty dependency array = runs once on mount

  /**
   * Handles form input changes
   * @param {Object} e - React change event
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Handles form submission
   * @param {Object} e - React form event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero" ref={heroRef}>
        <h1>Contact Us</h1>
        <p className="hero-subtitle">Get in Touch with Levitate Lounge</p>
      </section>

      <div className="contact-content">
        {/* Contact Information Cards */}
        <section className="contact-info-section">
          <div className="contact-info-grid" ref={cardsRef}>
            <div className="contact-card">
              <FaPhone className="contact-icon" />
              <h3>Phone</h3>
              <p>(303) 555-6789</p>
            </div>
            
            <div className="contact-card">
              <FaEnvelope className="contact-icon" />
              <h3>Email</h3>
              <p>info@Levitatelounge.com</p>
            </div>
            
            <div className="contact-card">
              <FaMapMarkerAlt className="contact-icon" />
              <h3>Location</h3>
              <p>123 Green Leaf Avenue<br />Denver, CO 80202</p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form" ref={formRef}>
            {/* Name Input */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Subject Input */}
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message Textarea */}
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;