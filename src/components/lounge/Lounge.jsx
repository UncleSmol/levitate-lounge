import { useState, useEffect, useRef } from 'react';
import { FaLeaf, FaFire, FaSeedling, FaHome, FaSun, FaPrescriptionBottle, FaCookie, FaJoint, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { gsap } from 'gsap';
import StrainCarousel from './StrainCarousel';
import './Lounge.css';
import { fetchStrainData } from '../../services/strainService';

const Lounge = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    specials: false,
    indoor: false,
    outdoor: false,
    greenhouse: false,
    medical: false,
    edibles: false,
    prerolls: false
  });

  const [strainData, setStrainData] = useState({
    specialStrains: [],
    indoorStrains: [],
    outdoorStrains: [],
    greenhouseStrains: [],
    medicalStrains: [],
    edibleStrains: [],
    prerollStrains: []
  });

  const headerRef = useRef(null);
  const navRef = useRef(null);
  const sectionsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set([headerRef.current, navRef.current, '.category-section'], {
      opacity: 0,
      y: 20
    });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      autoAlpha: 1
    })
    .to(navRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3')
    .to('.category-section', {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
      autoAlpha: 1
    }, '-=0.3');

    return () => tl.kill();
  }, []);

  useEffect(() => {
    const loadStrainData = async () => {
      const data = await fetchStrainData();
      if (data) {
        setStrainData(data);
      }
    };

    loadStrainData();
  }, []);

  const categories = [
    { id: 'all', name: 'All Products', icon: <FaLeaf /> },
    { id: 'specials', name: 'Specials', icon: <FaFire /> },
    { id: 'indoor', name: 'Indoor', icon: <FaHome /> },
    { id: 'outdoor', name: 'Outdoor', icon: <FaSun /> },
    { id: 'greenhouse', name: 'Greenhouse', icon: <FaSeedling /> },
    { id: 'medical', name: 'Medical', icon: <FaPrescriptionBottle /> },
    { id: 'edibles', name: 'Edibles', icon: <FaCookie /> },
    { id: 'prerolls', name: 'Pre-Rolls', icon: <FaJoint /> },
  ];

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    
    const newExpandedState = categoryId === 'all' 
      ? Object.keys(expandedSections).reduce((acc, key) => ({ ...acc, [key]: false }), {})
      : Object.keys(expandedSections).reduce((acc, key) => ({ ...acc, [key]: key === categoryId }), {});
    
    setExpandedSections(newExpandedState);

    gsap.to('.category-section', {
      opacity: 0.3,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.inOut'
    }).then(() => {
      setExpandedSections(newExpandedState);
      gsap.to('.category-section', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.1
      });
    });
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => {
      const isCurrentlyExpanded = prev[sectionId];
      return Object.keys(prev).reduce((acc, key) => ({
        ...acc,
        [key]: key === sectionId ? !isCurrentlyExpanded : false
      }), {});
    });
  };

  return (
    <div className="lounge-container">
      <div className="lounge-header" ref={headerRef}>
        <h1>Levitate Lounge Products</h1>
        <p>Explore our premium selection of cannabis products</p>
      </div>

      <div className="category-nav" ref={navRef}>
        <p className="scroll-hint">Scroll to see more categories ➜</p>
        <div className="category-scroll">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div ref={sectionsRef}>
        {/* Specials Section - Only shown when 'all' or 'specials' is active */}
        {(activeCategory === 'all' || activeCategory === 'specials') && (
          <section className="category-section">
            <div className="section-header collapsible" onClick={() => toggleSection('specials')}>
              <div className="section-title">
                <h2><FaFire /> Today's Specials</h2>
                <button className="toggle-button">
                  {expandedSections.specials ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              <p>Limited time offers on premium strains</p>
            </div>
            {expandedSections.specials && (
              <StrainCarousel 
                strains={strainData.specialStrains.length > 0 
                  ? strainData.specialStrains 
                  : [{ 
                      id: 's1',
                      name: 'Sample Special',
                      thc: '0%',
                      type: 'Hybrid',
                      price: 'R0'
                    }]
                } 
                title="Featured Specials" 
              />
            )}
          </section>
        )}

        {/* Indoor Section - Only shown when 'all' or 'indoor' is active */}
        {(activeCategory === 'all' || activeCategory === 'indoor') && (
          <section className="category-section">
            <div className="section-header collapsible" onClick={() => toggleSection('indoor')}>
              <div className="section-title">
                <h2><FaHome /> Indoor Grown</h2>
                <button className="toggle-button">
                  {expandedSections.indoor ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              <p>Premium indoor cultivated strains</p>
            </div>
            {expandedSections.indoor && (
              <StrainCarousel 
                strains={strainData.indoorStrains.length > 0 
                  ? strainData.indoorStrains 
                  : [{ 
                      id: 'i1',
                      name: 'Sample Indoor',
                      thc: '0%',
                      type: 'Hybrid',
                      price: 'R0'
                    }]
                } 
                title="Top Indoor Strains" 
              />
            )}
          </section>
        )}

        {/* Outdoor Section - Only shown when 'all' or 'outdoor' is active */}
        {(activeCategory === 'all' || activeCategory === 'outdoor') && (
          <section className="category-section">
            <div className="section-header collapsible" onClick={() => toggleSection('outdoor')}>
              <div className="section-title">
                <h2><FaSun /> Outdoor Grown</h2>
                <button className="toggle-button">
                  {expandedSections.outdoor ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              <p>Sun-grown natural cannabis</p>
            </div>
            {expandedSections.outdoor && (
              <StrainCarousel 
                strains={strainData.outdoorStrains.length > 0 
                  ? strainData.outdoorStrains 
                  : [{ 
                      id: 'o1',
                      name: 'Sample Outdoor',
                      thc: '0%',
                      type: 'Sativa',
                      price: 'R0'
                    }]
                } 
                title="Sun-Grown Favorites" 
              />
            )}
          </section>
        )}

        {/* Greenhouse Section - Only shown when 'all' or 'greenhouse' is active */}
        {(activeCategory === 'all' || activeCategory === 'greenhouse') && (
          <section className="category-section">
            <div className="section-header collapsible" onClick={() => toggleSection('greenhouse')}>
              <div className="section-title">
                <h2><FaSeedling /> Greenhouse</h2>
                <button className="toggle-button">
                  {expandedSections.greenhouse ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              <p>The perfect balance of sun and controlled environment</p>
            </div>
            {expandedSections.greenhouse && (
              <StrainCarousel 
                strains={strainData.greenhouseStrains.length > 0 
                  ? strainData.greenhouseStrains 
                  : [{ 
                      id: 'g1',
                      name: 'Sample Greenhouse',
                      thc: '0%',
                      type: 'Hybrid',
                      price: 'R0'
                    }]
                } 
                title="Greenhouse Selection" 
              />
            )}
          </section>
        )}

        {/* Medical Section - Only shown when 'all' or 'medical' is active */}
        {(activeCategory === 'all' || activeCategory === 'medical') && (
          <section className="category-section">
            <div className="section-header collapsible" onClick={() => toggleSection('medical')}>
              <div className="section-title">
                <h2><FaPrescriptionBottle /> Medical</h2>
                <button className="toggle-button">
                  {expandedSections.medical ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              <p>Therapeutic strains for medical cannabis patients</p>
            </div>
            {expandedSections.medical && (
              <StrainCarousel 
                strains={strainData.medicalStrains.length > 0 
                  ? strainData.medicalStrains 
                  : [{ 
                      id: 'm1',
                      name: 'Sample Medical',
                      thc: '0%',
                      cbd: '0%',
                      type: 'Medical',
                      price: 'R0'
                    }]
                } 
                title="Medical Products" 
              />
            )}
          </section>
        )}

        {/* Edibles Section - Only shown when 'all' or 'edibles' is active */}
        {(activeCategory === 'all' || activeCategory === 'edibles') && (
          <section className="category-section">
            <div className="section-header collapsible" onClick={() => toggleSection('edibles')}>
              <div className="section-title">
                <h2><FaCookie /> Edibles</h2>
                <button className="toggle-button">
                  {expandedSections.edibles ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              <p>Delicious cannabis-infused treats</p>
            </div>
            {expandedSections.edibles && (
              <StrainCarousel 
                strains={strainData.edibleStrains.length > 0 
                  ? strainData.edibleStrains 
                  : [{ 
                      id: 'e1',
                      name: 'Sample Edible',
                      thc: '0mg',
                      type: 'Edible',
                      price: 'R0'
                    }]
                } 
                title="Edible Products" 
              />
            )}
          </section>
        )}

        {/* Pre-Rolls Section - Only shown when 'all' or 'prerolls' is active */}
        {(activeCategory === 'all' || activeCategory === 'prerolls') && (
          <section className="category-section">
            <div className="section-header collapsible" onClick={() => toggleSection('prerolls')}>
              <div className="section-title">
                <h2><FaJoint /> Pre-Rolls</h2>
                <button className="toggle-button">
                  {expandedSections.prerolls ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              <p>Ready-to-enjoy premium joints</p>
            </div>
            {expandedSections.prerolls && (
              <StrainCarousel 
                strains={strainData.prerollStrains.length > 0 
                  ? strainData.prerollStrains 
                  : [{ 
                      id: 'p1',
                      name: 'Sample Pre-Roll',
                      weight: '0g',
                      thc: '0%',
                      price: 'R0'
                    }]
                } 
                title="Pre-Rolled Selection" 
              />
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Lounge;