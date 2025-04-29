import React from 'react';
import PropTypes from 'prop-types';
import './TransparentLogo.css';
import logoImage from '../../Levitate-lounge-leaf.png';

/**
 * A component that displays the logo with a transparent background
 * Can be reused throughout the application
 */
const TransparentLogo = ({ size, className, withGlow }) => {
  return (
    <div className={`transparent-logo-container ${className}`}>
      <img 
        src={logoImage} 
        alt="Levitate Lounge Logo" 
        className={`transparent-logo ${withGlow ? 'with-glow' : ''}`}
        style={{ 
          width: size === 'small' ? '80px' : 
                 size === 'medium' ? '150px' : 
                 size === 'large' ? '250px' : '150px'  
        }}
      />
    </div>
  );
};

TransparentLogo.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  withGlow: PropTypes.bool
};

TransparentLogo.defaultProps = {
  size: 'medium',
  className: '',
  withGlow: true
};

export default TransparentLogo;