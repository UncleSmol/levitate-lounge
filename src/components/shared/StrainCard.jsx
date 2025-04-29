import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaLeaf, FaPercent, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './StrainCard.css';

const StrainCard = ({
  strain = {
    id: 0,
    name: 'Sample Strain',
    type: 'Hybrid',
    thc: '0%',
    cbd: '0%',
    rating: 0,
    effects: [],
    price: 'R0',
    pricePerGram: 'R0/g',
    images: ['/placeholder.jpg'],
    isFeatured: false,
    isNew: false
  },
  onReserve = () => {}
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ensure images array exists and has items
  const images = Array.isArray(strain.images) && strain.images.length > 0 
    ? strain.images 
    : ['/placeholder.jpg'];

  // Ensure effects array exists
  const effects = Array.isArray(strain.effects) ? strain.effects : [];

  // Function to handle next image
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle previous image
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Function to render star rating (simplified)
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <>
        {fullStars >= 1 && <FaStar className="star-filled" />}
        {fullStars >= 2 && <FaStar className="star-filled" />}
        {fullStars >= 3 && <FaStar className="star-filled" />}
        {fullStars >= 4 && <FaStar className="star-filled" />}
        {fullStars >= 5 && <FaStar className="star-filled" />}
        {hasHalfStar && fullStars < 5 && <FaStar className="star-half" />}
        {!hasHalfStar && fullStars < 5 && <FaStar className="star-empty" />}
        <span className="rating-value">{rating}</span>
      </>
    );
  };

  // Determine strain type class
  const typeClass = `strain-type ${strain.type.toLowerCase()}`;

  return (
    <div className="strain-card">
      {/* Image Gallery */}
      <div className="strain-gallery">
        <div 
          className="gallery-container" 
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img 
              key={`image-${index}`} 
              src={image} 
              alt={`${strain.name} ${index + 1 > 1 ? `view ${index + 1}` : ''}`} 
              className="gallery-image"
            />
          ))}
        </div>
        
        {/* Gallery Navigation Dots (only if multiple images) */}
        {images.length > 1 && (
          <div className="gallery-nav">
            {images.map((_, index) => (
              <div 
                key={`dot-${index}`}
                className={`gallery-dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>
        )}
        
        {/* Gallery Navigation Arrows (only if multiple images) */}
        {images.length > 1 && (
          <>
            <div className="gallery-arrow prev" onClick={prevImage}>
              <FaChevronLeft />
            </div>
            <div className="gallery-arrow next" onClick={nextImage}>
              <FaChevronRight />
            </div>
          </>
        )}
        
        {/* Strain Type Badge */}
        <div className={typeClass}>{strain.type}</div>
        
        {/* Featured or New Badge */}
        {(strain.isFeatured || strain.isNew) && (
          <div className="strain-badge">
            {strain.isFeatured ? 'Featured' : 'New'}
          </div>
        )}
      </div>
      
      {/* Strain Content */}
      <div className="strain-content">
        <h3 className="strain-name">{strain.name}</h3>
        
        <div className="strain-info-row">
          <div className="strain-rating">
            {renderStars(strain.rating)}
          </div>
          
          <div className="strain-potency">
            <span className="thc"><FaPercent /> {strain.thc}</span>
            <span className="cbd"><FaLeaf /> {strain.cbd}</span>
          </div>
        </div>
        
        <div className="strain-tags">
          {effects.slice(0, 3).map((effect, index) => (
            <span key={`effect-${index}`} className="effect-tag">{effect}</span>
          ))}
        </div>
        
        <div className="strain-footer">
          <div className="price-container">
            <span className="price-value">{strain.price}</span>
            <span className="price-per-gram">{strain.pricePerGram}</span>
          </div>
          <button 
            className="reserve-button" 
            onClick={() => onReserve(strain)}
            aria-label={`Reserve ${strain.name}`}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

StrainCard.propTypes = {
  strain: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    thc: PropTypes.string,
    cbd: PropTypes.string,
    rating: PropTypes.number,
    effects: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.string,
    pricePerGram: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    isFeatured: PropTypes.bool,
    isNew: PropTypes.bool
  }),
  onReserve: PropTypes.func
};

export default StrainCard;
