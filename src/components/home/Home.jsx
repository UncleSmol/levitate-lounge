import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';
import defaultHeroImage from '../../assets/images/logo.PNG'; // Import a local fallback image
import logoImage from '../../assets/images/logo.PNG'; // Import logo for the about section
import { FaStar, FaStarHalfAlt, FaRegStar, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaArrowUp } from 'react-icons/fa';
import { MdWarning } from 'react-icons/md';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Helper function to format date as relative time
const getRelativeTimeString = (date) => {
  const now = new Date();
  const diffInMs = now - date;
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInSecs < 60) return 'just now';
  if (diffInMins < 60) return `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
};

// Star Rating Component
const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="star star-filled" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="star star-half" />);
    } else {
      stars.push(<FaRegStar key={i} className="star star-empty" />);
    }
  }
  
  return <div className="star-rating">{stars}</div>;
};

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Home = ({ onNavigate }) => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const disclaimerRef = useRef(null);
  const hoursLocationRef = useRef(null);
  const reviewsRef = useRef(null);
  
  // Facebook image URL - we'll use this as a regular src attribute, not as an import
  const facebookImageUrl = "https://scontent.fpry1-1.fna.fbcdn.net/v/t39.30808-6/474551537_122167278590288295_7892502077743881603_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE1zifYz1XEupjl6kxqIuocybdakFp7oDDJt1qQWnugMDoSZozw3NqMK1nGwbohrt-vHrIZ_yZT-y0WFVytgssW&_nc_ohc=Q8MbGriWPskQ7kNvwFaYhaO&_nc_oc=AdlUyyOIdyCHZaBtqowx-yp8b-ePX5L1yc9rGzygytUiIO9hXku2DOALiSlqOAijlqw&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fpry1-1.fna&_nc_gid=7tFLkfXUeFcA-qmIL5_3xA&oh=00_AfGjBp_0gFMAW2_UdIdhffs1uWe7KxYiGVNDILmZVG5d3w&oe=6803CDCF";
  
  // State to track if the Facebook image loaded successfully
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  
  // Handle hero image loading success
  const handleHeroImageLoad = () => {
    setHeroImageLoaded(true);
  };

  // Handle hero image loading failure
  const handleHeroImageError = () => {
    console.log("Hero image failed to load");
    // Keep the state as false so we can display a fallback
    setHeroImageLoaded(false);
  };

  // Define business hours
  const businessHours = [
    { day: 'Monday', hours: '10:00 AM - 8:00 PM' },
    { day: 'Tuesday', hours: '10:00 AM - 8:00 PM' },
    { day: 'Wednesday', hours: '10:00 AM - 8:00 PM' },
    { day: 'Thursday', hours: '10:00 AM - 9:00 PM' },
    { day: 'Friday', hours: '10:00 AM - 10:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 10:00 PM' },
    { day: 'Sunday', hours: '11:00 AM - 6:00 PM' },
  ];

  // Business address and contact info
  const businessInfo = {
    address: 'Johannesburg, South Africa',
    phone: '(011) 555-6789',
    email: 'info@Levitatelounge.com',
    // Update coordinates for Johannesburg city center
    coordinates: {
      lat: -26.2041,
      lng: 28.0473
    }
  };

  // User reviews data with dates
  const reviews = [
    {
      id: 1,
      name: 'Michael Johnson',
      rating: 5,
      text: 'Incredible selection and knowledgeable staff. The lounge area is super comfortable and perfect for relaxing. I\'ll definitely be back!',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      id: 2,
      name: 'Sarah Williams',
      rating: 4.5,
      text: 'Love the atmosphere and product quality. The staff was very helpful in recommending products for my specific needs. Only wish the hours were a bit longer on Sundays.',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 2 weeks ago
    },
    {
      id: 3,
      name: 'David Thompson',
      rating: 5,
      text: 'As a first-timer, I was a bit nervous, but the staff were incredibly welcoming and educational. They took the time to explain everything and helped me find the perfect product.',
      date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000) // 45 days ago
    },
    {
      id: 4,
      name: 'Jessica Martinez',
      rating: 4,
      text: 'Great selection of premium products. The membership benefits are well worth it if you\'re a regular visitor. The ambiance is top-notch.',
      date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) // 3 months ago
    },
    {
      id: 5,
      name: 'Robert Anderson',
      rating: 5,
      text: 'Levitate Lounge has the best products in town, hands down. Their staff is knowledgeable and the prices are fair for the quality you receive. The lounge area is perfect for relaxing.',
      date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000) // 4 months ago
    },
    {
      id: 6,
      name: 'Amanda Wilson',
      rating: 4.5,
      text: 'I\'ve been to many lounges, but Levitate stands out. The atmosphere is welcoming and the product variety is impressive. Their budtenders are always helpful and never make you feel rushed.',
      date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000) // 6 months ago
    }
  ];

  // State for relative time (will update every minute)
  const [, setTimeUpdate] = useState(0);

  // State to show scroll-to-top button
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Set up timer to refresh relative times
    const timer = setInterval(() => {
      setTimeUpdate(prev => prev + 1);
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []); // Empty dependency array ensures this only runs once when component mounts

  useEffect(() => {
    // Scroll-to-top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animations on component mount
  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Set initial states
    gsap.set([
      heroRef.current,
      aboutRef.current,
      disclaimerRef.current,
      hoursLocationRef.current,
      reviewsRef.current
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

    // About section animation
    tl.to(aboutRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3');

    // Disclaimer section animation
    tl.to(disclaimerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3');

    // Hours & Location section animation
    tl.to(hoursLocationRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3');

    // Reviews section animation with staggered children
    tl.to(reviewsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3')
    .to('.review-card', {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3');

    // Clean up
    return () => {
      tl.kill();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="home-container">
      {/* Hero section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-overlay"></div>
        
        {/* Hero image container */}
        <div className="hero-image-container">
          <img 
            src={heroImageLoaded ? facebookImageUrl : defaultHeroImage}
            alt="Levitate Lounge Hero"
            className={`hero-background-image ${heroImageLoaded ? 'loaded' : ''}`}
            onLoad={handleHeroImageLoad}
            onError={handleHeroImageError}
          />
          
          {/* Show a color background if image fails to load */}
          {!heroImageLoaded && <div className="hero-fallback-background gradient-bg-primary"></div>}
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">Elevate Your Experience</h1>
          <p className="hero-subtitle">Premium cannabis products for the discerning connoisseur</p>
          
          <div className="cta-container">
            <button 
              className="button primary-button" 
              onClick={() => onNavigate('lounge')}
            >
              Explore Products
            </button>
            <button 
              className="button secondary-button" 
              onClick={() => onNavigate('membership')}
            >
              Join Membership
            </button>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="section about-section" ref={aboutRef}>
        <div className="container">
          <div className="about-content">
            <h2>About Levitate Lounge</h2>
            <p>
              At Levitate Lounge, we're passionate about providing high-quality cannabis products in a welcoming, 
              educational environment. Our expert staff carefully selects premium products to ensure an exceptional 
              experience for both newcomers and cannabis enthusiasts.
            </p>
            <button 
              className="about-link button" 
              onClick={() => onNavigate('about')}
            >
              Learn More About Us
            </button>
          </div>
          <div className="about-image">
            {/* Logo image with transparent background */}
            <img 
              src={logoImage} 
              alt="Levitate Lounge Logo" 
              className="logo-image shadow-hover"
            />
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="section disclaimer-section" ref={disclaimerRef}>
        <div className="container">
          <div className="card disclaimer-card">
            <div className="disclaimer-header">
              <MdWarning className="disclaimer-icon" />
              <h2>Important Information</h2>
            </div>
            <div className="disclaimer-content">
              <p>
                <strong>Age Verification Required:</strong> You must be 18+ years of age with valid ID to enter Levitate Lounge and purchase cannabis products.
              </p>
              <p>
                <strong>Health Disclaimer:</strong> Cannabis products may cause impairment and have health risks. Please consult with your physician before use, especially if you have medical conditions or are taking medications.
              </p>
              <p>
                <strong>Legal Notice:</strong> It is illegal to drive under the influence of cannabis. Be responsible and arrange alternative transportation if consuming our products.
              </p>
              <p>
                <strong>Consumption Policy:</strong> On-site consumption is permitted only in designated areas. Please respect our consumption guidelines and other guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hours & Location Section */}
      <section className="section hours-section" ref={hoursLocationRef}>
        <div className="container">
          <div className="section-container">
            <div className="card hours-card">
              <h2><FaClock className="section-icon" /> Hours of Operation</h2>
              <ul className="hours-list">
                {businessHours.map((day, index) => (
                  <li key={index} className={new Date().getDay() === (index + 1) % 7 ? 'current-day' : ''}>
                    <span className="day">{day.day}</span>
                    <span className="hours">{day.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="card contact-card">
              <h2><FaMapMarkerAlt className="section-icon" /> Find Us</h2>
              <address className="address-info">
                <p>{businessInfo.address}</p>
                <p><FaPhoneAlt className="contact-icon" /> {businessInfo.phone}</p>
                <p><a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a></p>
              </address>
              <div className="map-container">
                <MapContainer 
                  center={[businessInfo.coordinates.lat, businessInfo.coordinates.lng]} 
                  zoom={13} 
                  style={{ height: "300px", width: "100%", borderRadius: "inherit" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[businessInfo.coordinates.lat, businessInfo.coordinates.lng]}>
                    <Popup>
                      Levitate Lounge<br/>
                      {businessInfo.address}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section reviews-section" ref={reviewsRef}>
        <div className="container">
          <h2>What Our Customers Say</h2>
          <div className="reviews-container">
            {reviews.map(review => (
              <div key={review.id} className="card review-card shadow-hover">
                <div className="review-header">
                  <h3 className="reviewer-name">{review.name}</h3>
                  <StarRating rating={review.rating} />
                </div>
                <p className="review-text">{review.text}</p>
                <div className="review-date">{getRelativeTimeString(review.date)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showScrollTop && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default Home;
