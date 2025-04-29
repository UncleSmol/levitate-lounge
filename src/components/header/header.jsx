import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import './header.css';
import Logo from '../../assets/images/Lavitate-lounge-leaf.png';

// Icon imports
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiChair } from 'react-icons/bi';
import { MdCardMembership } from 'react-icons/md';
import { RiContactsLine, RiLoginBoxLine } from 'react-icons/ri';

/**
 * Header Component - Navigation bar with animated interactive elements
 * Features:
 * - GSAP-powered animations for smooth transitions
 * - Single visible label at a time
 * - Responsive touch/click handling
 * - Current page indication
 */
const Header = () => {
  // State
  const [currentPage, setCurrentPage] = useState('home');
  const labelRefs = useRef([]);
  const activeLabel = useRef(null);

  // Refs for animation targets
  const iconRefs = useRef([]);

  // Effect: Initialize current page and event listeners
  useEffect(() => {
    const updateCurrentPage = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
    };

    updateCurrentPage();
    window.addEventListener('hashchange', updateCurrentPage);
    return () => window.removeEventListener('hashchange', updateCurrentPage);
  }, []);

  /**
   * Handles hover/touch interactions for navigation items
   * @param {number} index - Navigation item index
   * @param {boolean} isActive - Whether interaction is starting
   */
  const handleLabelVisibility = (index, isActive) => {
    const targetLabel = labelRefs.current[index];
    
    // Kill any active animations
    if (activeLabel.current) {
      gsap.killTweensOf(activeLabel.current);
      gsap.set(activeLabel.current, { opacity: 0, visibility: 'hidden' });
    }

    if (isActive && targetLabel) {
      activeLabel.current = targetLabel;
      gsap.to(targetLabel, {
        opacity: 1,
        y: 0,
        visibility: 'visible',
        duration: 0.2,
        ease: 'power2.out'
      });
      
      // Animate icon scale
      gsap.to(iconRefs.current[index], {
        scale: 1.15,
        duration: 0.2,
        ease: 'power2.out'
      });
    } else {
      gsap.to(iconRefs.current[index], {
        scale: 1,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  };

  // Navigation items configuration
  const navItems = [
    { id: 1, label: 'Home', href: '#home', icon: <AiOutlineHome />, page: 'home' },
    { id: 2, label: 'About', href: '#about', icon: <AiOutlineInfoCircle />, page: 'about' },
    { id: 3, label: 'Lounge', href: '#lounge', icon: <BiChair />, page: 'lounge' },
    { id: 4, label: 'Membership', href: '#membership', icon: <MdCardMembership />, page: 'membership' },
    { id: 5, label: 'Contact', href: '#contact', icon: <RiContactsLine />, page: 'contact' },
    { id: 6, label: 'Sign In', href: '#signin', icon: <RiLoginBoxLine />, page: 'signin' },
  ];

  return (
    <header className="header">
      {/* Logo Section */}
      <img className="logo" src={Logo} alt="Levitate Lounge" />

      {/* Navigation Section */}
      <nav className="navBar">
        <ul className="navLinks">
          {navItems.map((item, index) => (
            <li
              key={item.id}
              className={currentPage === item.page ? 'current' : ''}
              onMouseEnter={() => handleLabelVisibility(index, true)}
              onMouseLeave={() => handleLabelVisibility(index, false)}
              onTouchStart={() => handleLabelVisibility(index, true)}
              onTouchEnd={() => handleLabelVisibility(index, false)}
            >
              <a 
                href={item.href} 
                onClick={() => setCurrentPage(item.page)}
              >
                {/* Navigation Icon */}
                <span 
                  className="nav-icon"
                  ref={el => iconRefs.current[index] = el}
                >
                  {item.icon}
                </span>

                {/* Hover Label */}
                <span 
                  className="nav-label"
                  ref={el => labelRefs.current[index] = el}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;