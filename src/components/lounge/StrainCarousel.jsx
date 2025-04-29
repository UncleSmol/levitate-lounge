import React, { useRef, useState, useEffect } from 'react';
import StrainCard from '../shared/StrainCard';
import './StrainCarousel.css';

const StrainCarousel = ({ strains = [], title, compact = false }) => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  // If no strains, use empty placeholders
  const displayStrains = strains.length > 0 
    ? strains 
    : Array(compact ? 8 : 6).fill().map((_, i) => ({ id: `placeholder-${i}` }));

  useEffect(() => {
    setTotalCards(displayStrains.length);
  }, [displayStrains]);

  // Update current index based on scroll position
  const updateCurrentIndex = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.querySelector('.carousel-card').offsetWidth;
      const gapWidth = parseInt(window.getComputedStyle(carouselRef.current.querySelector('.carousel-track')).gap);
      const totalWidth = cardWidth + gapWidth;
      
      // Calculate the index based on scroll position
      // For compact view, we may want to show multiple cards at once
      const visibleCards = compact ? Math.floor(carouselRef.current.offsetWidth / totalWidth) : 1;
      const index = Math.round(scrollPosition / totalWidth);
      setCurrentIndex(Math.max(0, Math.min(index, totalCards - visibleCards)));
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateCurrentIndex);
      return () => carousel.removeEventListener('scroll', updateCurrentIndex);
    }
  }, [totalCards]);

  // Handle mouse down event
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  // Handle touch start event
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  // Handle mouse move event
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle touch move event
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse up event
  const handleMouseUp = () => {
    setIsDragging(false);
    snapToNearestCard();
  };

  // Handle mouse leave event
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      snapToNearestCard();
    }
  };

  // Handle touch end event
  const handleTouchEnd = () => {
    setIsDragging(false);
    snapToNearestCard();
  };

  // Snap to the nearest card after dragging
  const snapToNearestCard = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.carousel-card').offsetWidth;
      const gapWidth = parseInt(window.getComputedStyle(carouselRef.current.querySelector('.carousel-track')).gap);
      const totalWidth = cardWidth + gapWidth;
      
      const scrollPosition = carouselRef.current.scrollLeft;
      const visibleCards = compact ? Math.floor(carouselRef.current.offsetWidth / totalWidth) : 1;
      const index = Math.round(scrollPosition / totalWidth);
      const newIndex = Math.max(0, Math.min(index, totalCards - visibleCards));
      
      // Scroll to the nearest card
      carouselRef.current.scrollTo({
        left: newIndex * totalWidth,
        behavior: 'smooth'
      });
      
      setCurrentIndex(newIndex);
    }
  };

  // Scroll to previous card
  const scrollPrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      scrollToIndex(newIndex);
      setCurrentIndex(newIndex);
    }
  };

  // Scroll to next card
  const scrollNext = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.carousel-card').offsetWidth;
      const gapWidth = parseInt(window.getComputedStyle(carouselRef.current.querySelector('.carousel-track')).gap);
      const totalWidth = cardWidth + gapWidth;
      const visibleCards = compact ? Math.floor(carouselRef.current.offsetWidth / totalWidth) : 1;
      
      if (currentIndex < totalCards - visibleCards) {
        // In compact mode, we may want to scroll by multiple cards
        const scrollBy = compact ? Math.min(visibleCards, totalCards - visibleCards - currentIndex) : 1;
        const newIndex = currentIndex + scrollBy;
        scrollToIndex(newIndex);
        setCurrentIndex(newIndex);
      }
    }
  };

  // Scroll to a specific index
  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.carousel-card').offsetWidth;
      const gapWidth = parseInt(window.getComputedStyle(carouselRef.current.querySelector('.carousel-track')).gap);
      const totalWidth = cardWidth + gapWidth;
      
      carouselRef.current.scrollTo({
        left: index * totalWidth,
        behavior: 'smooth'
      });
    }
  };

  // Calculate visible cards for compact mode
  const getVisibleCards = () => {
    if (!carouselRef.current || !compact) return 1;
    
    const cardWidth = carouselRef.current.querySelector('.carousel-card')?.offsetWidth || 0;
    if (cardWidth === 0) return 1;
    
    const gapWidth = parseInt(window.getComputedStyle(carouselRef.current.querySelector('.carousel-track')).gap);
    const totalWidth = cardWidth + gapWidth;
    return Math.floor(carouselRef.current.offsetWidth / totalWidth);
  };

  // Determine if next button should be disabled
  const isNextDisabled = () => {
    const visibleCards = getVisibleCards();
    return currentIndex >= totalCards - visibleCards;
  };

  return (
    <div className={`strain-carousel-container ${compact ? 'compact' : ''}`}>
      <div className="carousel-header">
        <h3>{title}</h3>
        <div className="carousel-controls">
          <button 
            className={`carousel-control prev ${currentIndex === 0 ? 'disabled' : ''}`}
            onClick={scrollPrev}
            aria-label="Previous"
            disabled={currentIndex === 0}
          >
            &#10094;
          </button>
          {!compact && (
            <div className="carousel-indicators">
              {displayStrains.map((_, index) => (
                <span 
                  key={index} 
                  className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    scrollToIndex(index);
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>
          )}
          <button 
            className={`carousel-control next ${isNextDisabled() ? 'disabled' : ''}`}
            onClick={scrollNext}
            aria-label="Next"
            disabled={isNextDisabled()}
          >
            &#10095;
          </button>
        </div>
      </div>
      
      <div 
        className={`strain-carousel ${isDragging ? 'dragging' : ''} ${compact ? 'compact' : ''}`}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel-track">
          {displayStrains.map((strain, index) => (
            <div 
              key={strain.id || index} 
              className={`carousel-card ${index === currentIndex ? 'active' : ''} ${compact ? 'compact' : ''}`}
            >
              <StrainCard strain={strain} compact={compact} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrainCarousel;
