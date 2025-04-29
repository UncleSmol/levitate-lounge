import React from 'react';
import PropTypes from 'prop-types';
import { FaPercent } from 'react-icons/fa';
import './SpecialCard.css';

const SpecialCard = ({ special }) => {
  const { id, title, description, validUntil, code, exclusive } = special;
  
  return (
    <div className="special-card">
      {exclusive && (
        <span className="exclusive-tag">Member Exclusive</span>
      )}
      <h3>{title}</h3>
      <p className="special-description">{description}</p>
      <div className="special-meta">
        <p className="valid-until">Valid until: {validUntil}</p>
        <div className="special-code">
          <span>Use code:</span>
          <div className="code-value">{code}</div>
        </div>
      </div>
      <div className="special-icon">
        <FaPercent />
      </div>
    </div>
  );
};

SpecialCard.propTypes = {
  special: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    validUntil: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    exclusive: PropTypes.bool
  }).isRequired
};

export default SpecialCard;