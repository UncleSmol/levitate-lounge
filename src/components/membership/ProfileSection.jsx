import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaEdit, FaSave, FaTimes, FaLeaf, FaCamera, FaTrash } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';
import './ProfileSection.css';

const ProfileSection = ({
  userData,
  editMode,
  editedUserData,
  toggleEditMode,
  saveChanges,
  handleInputChange,
  handleCheckboxChange,
  handleFavoriteStrainChange,
  addFavoriteStrain,
  removeFavoriteStrain,
  handleProfileImageChange,
  profileImageUrl
}) => {
  const [localImageUrl, setLocalImageUrl] = useState(profileImageUrl);

    useEffect(() => {
    setLocalImageUrl(profileImageUrl);
  }, [profileImageUrl]);

  const handleImageChange = (event) => {
    handleProfileImageChange(event);
    const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setLocalImageUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
  };

  return (
    <section className="profile-section">
      <div className="section-content">
        <div className="profile-header">
          <h2>My Profile</h2>
          <button className={`edit-button ${editMode ? 'active' : ''}`} onClick={toggleEditMode}>
            {editMode ? (
              <>
                <FaTimes /> Cancel
              </>
            ) : (
              <>
                <FaEdit /> Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="card profile-card">
          {editMode ? (
            <div className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="profileImage">Profile Image</label>
                <div className="profile-icon-edit">
                    {localImageUrl ? (
                      <img src={localImageUrl} alt="Profile" />
                    ) : (
                      <div className="upload-text">
                         <FaCamera size={30} /><br/> Upload Image
                      </div>
                    )}
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedUserData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedUserData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editedUserData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Favorite Strains</label>
                {editedUserData.favoriteStrains.map((strain, index) => (
                  <div key={index} className="favorite-strain-input">
                    <input
                      type="text"
                      value={strain}
                      onChange={(e) => handleFavoriteStrainChange(index, e.target.value)}
                    />
                    <button
                      type="button"
                      className="remove-strain"
                      onClick={() => removeFavoriteStrain(index)}
                    >
                      <FaTrash className="trash-icon" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-strain-button"
                  onClick={addFavoriteStrain}
                >
                  + Add Strain
                </button>
              </div>

              <div className="form-group preferences-group">
                <label>Notification Preferences</label>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="notificationsEnabled"
                    name="preferences.notificationsEnabled"
                    checked={editedUserData.preferences.notificationsEnabled}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="notificationsEnabled">Enable Notifications</label>
                </div>

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="marketingEmails"
                    name="preferences.marketingEmails"
                    checked={editedUserData.preferences.marketingEmails}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="marketingEmails">Receive Marketing Emails</label>
                </div>

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="smsAlerts"
                    name="preferences.smsAlerts"
                    checked={editedUserData.preferences.smsAlerts}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="smsAlerts">SMS Alerts</label>
                </div>
              </div>

              <div className="edit-actions">
                <button className="button save-button" onClick={saveChanges}>
                  <FaSave /> Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-details">
              <div className="profile-icon">
                 {localImageUrl ? (
                   <img src={localImageUrl} alt="Profile" />
                 ) : (
                   <FaUser />
                 )}
               </div>

              <div className="profile-info">
                <h3>{userData.name}</h3>
                <p className="profile-meta">Member since {userData.joinDate}</p>

                <div className="profile-contact">
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Phone:</strong> {userData.phone}</p>
                </div>

                <div className="profile-preferences">
                  <h4>Notification Preferences</h4>
                  <p className={userData.preferences.notificationsEnabled ? 'enabled' : 'disabled'}>
                    <MdNotifications /> Notifications {userData.preferences.notificationsEnabled ? 'Enabled' : 'Disabled'}
                  </p>
                  <p className={userData.preferences.marketingEmails ? 'enabled' : 'disabled'}>
                    Marketing Emails {userData.preferences.marketingEmails ? 'Yes' : 'No'}
                  </p>
                  <p className={userData.preferences.smsAlerts ? 'enabled' : 'disabled'}>
                    SMS Alerts {userData.preferences.smsAlerts ? 'Yes' : 'No'}
                  </p>
                </div>

                <div className="favorite-strains">
                  <h4>Favorite Strains</h4>
                  {userData.favoriteStrains && userData.favoriteStrains.length > 0 ? (
                    <ul>
                      {userData.favoriteStrains.map((strain, index) => (
                        <li key={index}>
                          <FaLeaf className="strain-icon" /> {strain}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No favorite strains added yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

ProfileSection.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    joinDate: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    profileImageUrl: PropTypes.string,
    preferences: PropTypes.shape({
      notificationsEnabled: PropTypes.bool,
      marketingEmails: PropTypes.bool,
      smsAlerts: PropTypes.bool,
    }),
    favoriteStrains: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  editMode: PropTypes.bool.isRequired,
  editedUserData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    preferences: PropTypes.shape({
      notificationsEnabled: PropTypes.bool,
      marketingEmails: PropTypes.bool,
      smsAlerts: PropTypes.bool,
    }),
    favoriteStrains: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  saveChanges: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleFavoriteStrainChange: PropTypes.func.isRequired,
  addFavoriteStrain: PropTypes.func.isRequired,
  removeFavoriteStrain: PropTypes.func.isRequired,
  handleProfileImageChange: PropTypes.func.isRequired,
  profileImageUrl: PropTypes.string
};

ProfileSection.defaultProps = {
  profileImageUrl: null,
  userData: {
    preferences: {},
    favoriteStrains: [],
  },
  editedUserData: {
     preferences: {},
     favoriteStrains: [],
  }
};

export default ProfileSection;
