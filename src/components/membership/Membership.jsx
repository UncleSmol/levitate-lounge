import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaArrowLeft,
  FaInfoCircle,
} from 'react-icons/fa';
import PropTypes from 'prop-types';

// Component imports
import MembershipCard from './MembershipCard';
import StrainCard from '../shared/StrainCard';
import ProfileSection from './ProfileSection'; // Import the ProfileSection component

// Service import
import { fetchActiveMemberSpecials } from '../../services/strainService'; // Assuming strainService.js is in a 'services' folder

// Styles
import './Membership.css';

const Membership = ({ onNavigate }) => {
  // User data with South African examples - in a real app this would come from your backend
  const [userData, setUserData] = useState({
    name: 'Lerato Themba',
    email: 'lerato.themba@example.co.za',
    phone: '072 555 6789', // South African phone number format
    joinDate: 'March 10, 2024', // Example date format
    membershipLevel: 'Gold',
    favoriteStrains: ['Durban Poison', 'Swazi Gold', 'Power Plant'], // South African strain examples
    preferences: {
      notificationsEnabled: true,
      marketingEmails: true,
      smsAlerts: false,
    },
    points: 450,
    profileImage: null, // Or a path to a default SA-themed image if available
  });

  // State for specials data, initialized as an empty array
  const [specials, setSpecials] = useState([]);

  // Premium strains (mocked) - these could also come from your backend
  const [premiumStrains] = useState([
    {
      id: 1,
      name: 'Premium Durban Poison',
      type: 'Premium Sativa',
      thc: '27%',
      cbd: '1%',
      rating: 4.9,
      effects: ['Energizing', 'Uplifting', 'Focus'],
      price: 'R 650.00',
      pricePerGram: 'R 162.50/g',
      images: ['/premium-durban-poison.jpg'],
      isFeatured: true,
      isNew: false,
      isPremium: true,
      premiumBadge: 'Gold Member Exclusive',
      premiumDiscount: '15% Off',
    },
    {
      id: 2,
      name: 'Premium Swazi Gold',
      type: 'Premium Sativa',
      thc: '25%',
      cbd: '0.5%',
      rating: 4.8,
      effects: ['Euphoric', 'Creative', 'Giggly'],
      price: 'R 700.00',
      pricePerGram: 'R 175.00/g',
      images: ['/premium-swazi-gold.jpg'],
      isFeatured: true,
      isNew: false,
      isPremium: true,
      premiumBadge: 'Platinum Selection',
      premiumDiscount: '20% Off',
    },
  ]);

  // State for edit mode (moved from ProfileSection)
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ ...userData });
  const [profileImageUrl, setProfileImageUrl] = useState(
    userData.profileImage || null
  );

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const profileRef = useRef(null); // Add ref for profile section
  const cardSectionRef = useRef(null);
  const specialsRef = useRef(null);
  const premiumRef = useRef(null);

  useEffect(() => {
    const getSpecials = async () => {
      // Function to fetch specials data - replace with your actual API call
      const activeSpecials = await fetchActiveMemberSpecials();
      // Map the fetched specials data to the format expected by StrainCard
      const specialsForStrainCard = activeSpecials.map((special) => {
        // Handle potential null or undefined price values
        const discountedPrice =
          special.discounted_price !== null &&
          special.discounted_price !== undefined
            ? parseFloat(special.discounted_price)
            : null;
        const basePrice =
          special.base_price !== null && special.base_price !== undefined
            ? parseFloat(special.base_price)
            : null;

        // Determine the price to display
        let displayPrice = 'See Details';
        if (discountedPrice !== null && !isNaN(discountedPrice)) {
          displayPrice = `R ${discountedPrice
            .toFixed(2)
            .replace('.', ',')}`; // Format price
        } else if (basePrice !== null && !isNaN(basePrice)) {
          displayPrice = `R ${basePrice.toFixed(2).replace('.', ',')}`;
        }

        return {
          id: special.id,
          name: special.title,
          type:
            special.category === 'premium_strain'
              ? 'Premium Strain'
              : 'Special Offer',
          thc: special.thc || 'N/A',
          cbd: special.cbd || 'N/A',
          rating: special.rating || 0,
          effects: special.effects
            ? JSON.parse(special.effects)
            : [special.description],
          price: displayPrice,
          pricePerGram: special.price_per_gram || '',
          images: special.image_urls
            ? JSON.parse(special.image_urls)
            : ['../../assets/images/logo.PNG'],
          isFeatured: special.is_featured || false,
          isNew: special.is_new || false,
          isPremium: special.category === 'premium_strain',
          premiumBadge: special.premium_badge || '',
          premiumDiscount:
            special.premium_discount_text || special.promo_code || '',
          validUntil: special.valid_until,
          promoCode: special.promo_code,
          description: special.description,
        };
      });
      setSpecials(specialsForStrainCard);
    };

    getSpecials();

    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set(
      [
        heroRef.current,
        profileRef.current, // Include profileRef in initial set
        cardSectionRef.current,
        specialsRef.current,
        premiumRef.current,
        '.strain-card',
      ],
      {
        opacity: 0,
        y: 20,
        autoAlpha: 0, // Ensure it's not just opacity: 0 but also visibility: hidden
      }
    );

    tl.to(heroRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      autoAlpha: 1,
    })
      .to(profileRef.current, {
        // Animate profile section
        opacity: 1,
        y: 0,
        duration: 0.6,
        autoAlpha: 1,
      }, '-=0.3')
      .to(cardSectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        autoAlpha: 1,
      }, '-=0.3')
      .to(specialsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        autoAlpha: 1,
      }, '-=0.3')
      .to('.strain-card', {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        autoAlpha: 1,
      }, '-=0.3')
      .to(premiumRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        autoAlpha: 1,
      }, '-0.3')
      .to('.strain-card', {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        autoAlpha: 1,
      }, '-=0.3');

    return () => tl.kill();
  }, []);

  // --- Profile section handlers ---
  const toggleEditMode = () => {
    if (editMode) {
      // Cancel edit - revert changes
      setEditedUserData({ ...userData });
    } else {
      // Enter edit mode - copy current data
      setEditedUserData({ ...userData });
    }
    setEditMode(!editMode);
  };

  const saveChanges = () => {
    setUserData({ ...editedUserData });
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedUserData({
        ...editedUserData,
        [parent]: {
          ...editedUserData[parent],
          [child]: value,
        },
      });
    } else {
      setEditedUserData({
        ...editedUserData,
        [name]: value,
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedUserData({
        ...editedUserData,
        [parent]: {
          ...editedUserData[parent],
          [child]: checked,
        },
      });
    } else {
      setEditedUserData({
        ...editedUserData,
        [name]: checked,
      });
    }
  };

  const handleFavoriteStrainChange = (index, value) => {
    const updatedFavorites = [...editedUserData.favoriteStrains];
    updatedFavorites[index] = value;
    setEditedUserData({
      ...editedUserData,
      favoriteStrains: updatedFavorites,
    });
  };

  const addFavoriteStrain = () => {
    setEditedUserData({
      ...editedUserData,
      favoriteStrains: [...editedUserData.favoriteStrains, ''],
    });
  };

  const removeFavoriteStrain = (index) => {
    const updatedFavorites = [...editedUserData.favoriteStrains];
    updatedFavorites.splice(index, 1);
    setEditedUserData({
      ...editedUserData,
      favoriteStrains: updatedFavorites,
    });
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // TODO: Implement actual image upload to server
        const imageUrl = URL.createObjectURL(file);
        setProfileImageUrl(imageUrl);
        setEditedUserData({
          ...editedUserData,
          profileImage: imageUrl,
        });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  // --- End profile section handlers ---

  const handleReserveStrain = (special) => {
    alert(
      `Special Offer: ${special.name}\nDescription: ${special.description}\nValid Until: ${
        special.validUntil || 'N/A'
      }\nCode: ${special.promoCode || 'N/A'}\n\nImplement your reservation logic here.`
    );
  };

  const handlePremiumReserve = (strain) => {
    console.log(`Reserved premium strain: ${strain.name}`);
  };

  const handleNavigation = (destination) => {
    onNavigate(destination);
  };

  return (
    <div className="membership-container">
      <section className="membership-hero" ref={heroRef}>
        <div className="hero-content">
          <h1>Member Dashboard</h1>
          <p className="hero-subtitle">
            Exclusive benefits for our valued members
          </p>
        </div>
      </section>

      {/* Render ProfileSection directly */}
      <ProfileSection
        ref={profileRef} // Attach the ref to the ProfileSection itself
        userData={userData}
        editMode={editMode}
        editedUserData={editedUserData}
        toggleEditMode={toggleEditMode}
        saveChanges={saveChanges}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        handleFavoriteStrainChange={handleFavoriteStrainChange}
        addFavoriteStrain={addFavoriteStrain}
        removeFavoriteStrain={removeFavoriteStrain}
        handleProfileImageChange={handleProfileImageChange}
        profileImageUrl={profileImageUrl}
      />

      <section className="membership-card-section" ref={cardSectionRef}>
        <div className="section-content">
          <h2>Membership Card</h2>
          <p className="section-intro">
            <FaInfoCircle />
            Your digital membership card contains all your member details and
            benefits. Click on the card to flip it and see additional
            information.
          </p>

          <MembershipCard userData={userData} />
        </div>
      </section>

      <section className="specials-section" ref={specialsRef}>
        {/* Render specials section */}
        <h2 className="section-header">Current Specials</h2>
        <div className="strains-grid">
          {specials.map((special) => (
            // Use fetched 'specials' state
            <StrainCard
              // Still using StrainCard as per current implementation
              key={special.id}
              strain={special} // Pass the special object (mapped to StrainCard props)
              onReserve={() => handleReserveStrain(special)}
            />
          ))}
        </div>
      </section>

      <section className="premium-section" ref={premiumRef}>
        <h2 className="section-header">Premium Member Strains</h2>
        <div className="strains-grid">
          {premiumStrains.map((strain) => (
            <StrainCard
              key={strain.id}
              strain={strain}
              onReserve={() => handlePremiumReserve(strain)}
              className={`strain-card ${
                strain.isPremium ? 'premium' : ''
              }`}
            >
              {strain.premiumDiscount && (
                <div className="premium-discount">
                  {strain.premiumDiscount}
                </div>
              )}
            </StrainCard>
          ))}
        </div>
      </section>

      <div className="back-to-home">
        <button
          className="button primary-button"
          onClick={() => handleNavigation('home')}
        >
          <FaArrowLeft /> Back to Home
        </button>
      </div>
    </div>
  );
};

Membership.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default Membership;