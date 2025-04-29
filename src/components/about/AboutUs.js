import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AboutUs.css';

const AboutUs = ({ onNavigate }) => {
  // Animation refs
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);

  // GSAP animations on component mount
  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Set initial states
    gsap.set([
      heroRef.current,
      missionRef.current,
      storyRef.current,
      valuesRef.current,
      teamRef.current,
      contactRef.current,
      '.value-item',
      '.team-member'
    ], {
      opacity: 0,
      y: 20
    });

    // Hero section animation
    tl.to(heroRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      autoAlpha: 1
    });

    // Mission section animation
    tl.to(missionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3');

    // Story section animation
    tl.to(storyRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3');

    // Values section with staggered cards
    tl.to(valuesRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3')
    .to('.value-item', {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3');

    // Team section with staggered members
    tl.to(teamRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3')
    .to('.team-member', {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3');

    // Contact section animation
    tl.to(contactRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3');

    // Clean up
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="about-us-container">
      <section className="about-hero" ref={heroRef}>
        <h1>About Levitate Lounge</h1>
        <p className="hero-subtitle">Elevating Your Experience Since 2023</p>
      </section>

      <section className="about-mission" ref={missionRef}>
        <div className="section-content">
          <h2>Our Mission</h2>
          <p>
            At Levitate Lounge, our mission is to create a space where comfort meets innovation. 
            We believe in providing an environment where people can relax, connect, and experience 
            our exceptional services that elevate everyday experiences into extraordinary moments.
          </p>
        </div>
      </section>

      <section className="about-story" ref={storyRef}>
        <div className="section-content">
          <h2>Our Story</h2>
          <p>
            Levitate Lounge was founded with a simple yet powerful vision: to create a sanctuary 
            where people could escape the ordinary. What began as a small passion project has grown 
            into a vibrant community hub known for its unique atmosphere and exceptional service.
          </p>
          <p>
            Our journey started when a group of friends with diverse backgrounds in hospitality, 
            design, and wellness came together with a shared vision. Today, we continue to grow while 
            staying true to our core values of authenticity, community, and excellence.
          </p>
        </div>
      </section>

      <section className="about-values" ref={valuesRef}>
        <div className="section-content">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Innovation</h3>
              <p>We constantly seek new ways to improve and elevate our services.</p>
            </div>
            <div className="value-item">
              <h3>Community</h3>
              <p>We foster meaningful connections and create spaces where everyone belongs.</p>
            </div>
            <div className="value-item">
              <h3>Excellence</h3>
              <p>We commit to the highest standards in everything we do.</p>
            </div>
            <div className="value-item">
              <h3>Sustainability</h3>
              <p>We make responsible choices for our planet and future generations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team" ref={teamRef}>
        <div className="section-content">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo placeholder-photo"></div>
              <h3>Jane Doe</h3>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">With over 15 years in hospitality, Jane brings vision and leadership to Levitate Lounge.</p>
            </div>
            <div className="team-member">
              <div className="member-photo placeholder-photo"></div>
              <h3>John Smith</h3>
              <p className="member-role">Creative Director</p>
              <p className="member-bio">John's innovative designs create the unique atmosphere that defines our space.</p>
            </div>
            <div className="team-member">
              <div className="member-photo placeholder-photo"></div>
              <h3>Amanda Wilson</h3>
              <p className="member-role">Head of Experience</p>
              <p className="member-bio">Amanda ensures every guest leaves with an unforgettable memory.</p>
            </div>
            <div className="team-member">
              <div className="member-photo placeholder-photo"></div>
              <h3>Michael Chen</h3>
              <p className="member-role">Operations Manager</p>
              <p className="member-bio">Michael keeps everything running smoothly behind the scenes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-contact" ref={contactRef}>
        <div className="section-content">
          <h2>Get In Touch</h2>
          <p>We'd love to hear from you! Reach out to us with questions, feedback, or partnership opportunities.</p>
          <div className="contact-info">
            <div className="contact-item">
              <h3>Location</h3>
              <p>123 Levitate Street, Relaxation City, RC 10101</p>
            </div>
            <div className="contact-item">
              <h3>Email</h3>
              <p>hello@Levitatelounge.com</p>
            </div>
            <div className="contact-item">
              <h3>Phone</h3>
              <p>(555) 123-4567</p>
            </div>
          </div>
          {onNavigate && (
            <button className="button primary-button" onClick={() => onNavigate('home')}>
              Back to Home
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
