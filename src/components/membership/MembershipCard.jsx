import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCrown, FaSync, FaCalendarAlt, FaPhoneAlt, FaEnvelope, FaIdCard, FaLeaf, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './MembershipCard.css';

const MembershipCard = ({ userData, strainData }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Function to handle next image
  const nextImage = (e) => {
    e.stopPropagation(); // Prevent card flip
    if (strainData && strainData.images && strainData.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === strainData.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // Function to handle previous image
  const prevImage = (e) => {
    e.stopPropagation(); // Prevent card flip
    if (strainData && strainData.images && strainData.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? strainData.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={`star-${i}`} className="star-filled" />);
      } else {
        stars.push(<FaStar key={`star-${i}`} className="star-empty" />);
      }
    }
    
    return stars;
  };

  // Determine availability class
  const getAvailabilityClass = () => {
    if (!strainData) return '';
    return strainData.availability === 'high' ? 'availability-high' : 'availability-medium';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const memberId = `LVT-${Math.floor(userData.name.length * 100 + userData.points)}`;

  return (
    <div className="membership-card-container">
      <p className="flip-instruction">
        <FaSync className="flip-icon" /> Click card to flip
      </p>
      
      <div 
        className={`membership-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleCardFlip}
      >
        {/* Front Side */}
        <div className="front">
          <div className="card-bg"></div>
          <div className="card-content">
            <div className="card-header">
              {/* <div className="card-logo">
                <FaLeaf className="logo-icon" />
              </div> */}
              <h3>Levitate Lounge</h3>
              <span className="membership-level">
                <FaCrown /> {userData.membershipLevel}
              </span>
            </div>
            
            <div className="card-member-info">
              <p className="member-name">{userData.name}</p>
              <p className="member-id">
                <FaIdCard /> {memberId}
              </p>
            </div>
            
            <div className='cardWrapper'>
            <div className="card-footer">
              <div className="points-container">
                <p className="points-label">Reward Points</p>
                <p className="points-value">{userData.points}</p>
              </div>
              <div className="card-logo small">
                <div className="logo-circle"></div>
              </div>
            </div>
            
            <div className="card-barcode">
              <img 
                src={`https://barcode.tec-it.com/barcode.ashx?data=${memberId}&code=Code128&dpi=96`} 
                alt="Membership barcode"
              />
            </div>
            </div>
            
            
            {/* <p className="tap-to-flip">
              <FaSync size={10} /> Tap to see details
            </p> */}
          </div>
        </div>

        {/* Back Side - Strain Info */}
        <div className="back">
          <div className="card-bg"></div>
          <div className="card-content">
            {strainData ? (
              <>
                {/* Strain Image Gallery */}
                <div className="strain-gallery">
                  <div 
                    className="gallery-container" 
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {strainData.images && strainData.images.map((image, index) => (
                      <img 
                        key={`image-${index}`} 
                        src={image} 
                        alt={`${strainData.name} - Image ${index + 1}`} 
                        className="gallery-image"
                      />
                    ))}
                  </div>
                  
                  {/* Gallery Navigation */}
                  {strainData.images && strainData.images.length > 1 && (
                    <>
                      <div className="gallery-arrow prev" onClick={prevImage}>
                        <FaChevronLeft />
                      </div>
                      <div className="gallery-arrow next" onClick={nextImage}>
                        <FaChevronRight />
                      </div>
                      <div className="gallery-dots">
                        {strainData.images.map((_, index) => (
                          <span 
                            key={`dot-${index}`} 
                            className={`gallery-dot ${index === currentImageIndex ? 'active' : ''}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* Strain Type Badge */}
                  <div className={`strain-type ${strainData.type.toLowerCase()}`}>
                    {strainData.type}
                  </div>
                </div>
                
                {/* Strain Info */}
                <div className="strain-info">
                  <div className="strain-header">
                    <h4 className="strain-name">{strainData.name}</h4>
                    <div className="strain-rating">
                      {renderStars(strainData.rating)}
                    </div>
                  </div>
                  
                  <div className="strain-details">
                    <div className="thc-content">
                      THC: {strainData.thcContent}%
                    </div>
                    <div className={`strain-availability ${getAvailabilityClass()}`}>
                      {strainData.availability === 'high' ? 'In Stock' : 'Limited'}
                    </div>
                  </div>
                  
                  <p className="strain-description">{strainData.description}</p>
                  
                  <div className="strain-price-container">
                    <span className="strain-price">${strainData.price}</span>
                    <span className="price-per-gram">${strainData.pricePerGram}/g</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="card-back-header">
                  <h3>Member Details</h3>
                  <span className="membership-level">
                    <FaCrown /> {userData.membershipLevel}
                  </span>
                </div>
                
                <div className="card-details-grid">
                  <div className="details-section">
                    <h4>Contact Info</h4>
                    <div className="detail-item">
                      <FaIdCard className="detail-icon" />
                      <span className="detail-label">ID:</span>
                      <span className="detail-value">{memberId}</span>
                    </div>
                    <div className="detail-item">
                      <FaEnvelope className="detail-icon" />
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{userData.email}</span>
                    </div>
                    <div className="detail-item">
                      <FaPhoneAlt className="detail-icon" />
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value">{userData.phone}</span>
                    </div>
                  </div>
                  
                  {/* <div className="details-section">
                    <h4>Membership</h4>
                    <div className="detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <span className="detail-label">Since:</span>
                      <span className="detail-value">{formatDate(userData.joinDate)}</span>
                    </div>
                  </div> */}
                </div>
                
                {/* <div className="benefits-section">
                  <h4>Member Benefits</h4>
                  <ul className="benefits-list-compact">
                    <li>10% off all purchases</li>
                    <li>Exclusive premium strains access</li>
                    <li>Early access to new products</li>
                    <li>Free birthday gift</li>
                    <li>Monthly member events</li>
                    <li>Earn 2x reward points</li>
                  </ul>
                </div> */}
                
                <div className="card-footer">
                  <div className="points-container">
                    <p className="points-label">Reward Points</p>
                    <p className="points-value">{userData.points}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

MembershipCard.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    joinDate: PropTypes.string.isRequired,
    membershipLevel: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired
  }).isRequired,
  strainData: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    thcContent: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.number,
    pricePerGram: PropTypes.string,
    description: PropTypes.string,
    availability: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string)
  })
};

MembershipCard.defaultProps = {
  userData: {
    name: 'Member Name',
    email: 'email@example.com',
    phone: '(555) 555-5555',
    joinDate: new Date().toISOString(),
    membershipLevel: 'Standard',
    points: 100
  },
  strainData: null
};

export default MembershipCard;
