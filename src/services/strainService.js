const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchStrainData = async () => {
  try {
    const response = await fetch(`${API_URL}/strains`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const strains = await response.json();
    
    // Transform data to match StrainCard props
    const transformStrain = (strain) => ({
      id: Number(strain.id) || 0,
      name: strain.name || 'Sample Strain',
      type: strain.type || 'Hybrid',
      thc: strain.thc || '0%',
      cbd: strain.cbd || '0%',
      rating: Number(strain.rating) || 0,
      effects: Array.isArray(strain.effects) ? strain.effects : 
              typeof strain.effects === 'string' ? JSON.parse(strain.effects) : [],
      price: strain.price || 'R0',
      pricePerGram: strain.price_per_gram || 'R0/g',
      images: Array.isArray(strain.image_url) ? strain.image_url :
              typeof strain.image_url === 'string' ? JSON.parse(strain.image_url) : ['/placeholder.jpg'],
      isFeatured: Boolean(strain.is_featured),
      isNew: Boolean(strain.is_new),
      isOnSpecial: Boolean(strain.is_on_special)
    });

    const defaultStrain = {
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
      isNew: false,
      isOnSpecial: false
    };

    return {
      specialStrains: strains.filter(s => Boolean(s.is_on_special)).map(transformStrain) || [defaultStrain],
      indoorStrains: strains.filter(s => s.category === 'indoor').map(transformStrain) || [defaultStrain],
      outdoorStrains: strains.filter(s => s.category === 'outdoor').map(transformStrain) || [defaultStrain],
      greenhouseStrains: strains.filter(s => s.category === 'greenhouse').map(transformStrain) || [defaultStrain],
      medicalStrains: strains.filter(s => s.category === 'medical').map(transformStrain) || [defaultStrain],
      edibleStrains: strains.filter(s => s.category === 'edibles').map(transformStrain) || [defaultStrain],
      prerollStrains: strains.filter(s => s.category === 'prerolls').map(transformStrain) || [defaultStrain]
    };
  } catch (error) {
    console.error('Error fetching strain data:', error);
    const defaultStrain = {
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
      isNew: false,
      isOnSpecial: false
    };

    return {
      specialStrains: [defaultStrain],
      indoorStrains: [defaultStrain],
      outdoorStrains: [defaultStrain],
      greenhouseStrains: [defaultStrain],
      medicalStrains: [defaultStrain],
      edibleStrains: [defaultStrain],
      prerollStrains: [defaultStrain]
    };
  }
};

// New function to fetch all member specials
export const fetchAllMemberSpecials = async () => {
  try {
    const response = await fetch(`${API_URL}/member-specials`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching all member specials:', error);
    return [];
  }
};

// New function to fetch active member specials
export const fetchActiveMemberSpecials = async () => {
  try {
    const response = await fetch(`${API_URL}/member-specials/active`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching active member specials:', error);
    return [];
  }
};

// New function to fetch member specials by category
export const fetchMemberSpecialsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/member-specials/category/${category}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error(`Error fetching ${category} member specials:`, error);
    return [];
  }
};