import React, { Component } from 'react';
import './index.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      profile: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Experienced software engineer with 5+ years in web development',
        skills: ['JavaScript', 'React', 'Node.js', 'UI/UX'],
        picture: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      tempProfile: {},
      newSkill: ''
    };
  }

  componentDidMount() {
    // Load profile data from localStorage or API
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this.setState({ profile: JSON.parse(savedProfile) });
    }
  }

  handleEditToggle = () => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
      tempProfile: { ...prevState.profile }
    }));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      tempProfile: {
        ...prevState.tempProfile,
        [name]: value
      }
    }));
  };

  handleSkillChange = (e) => {
    this.setState({ newSkill: e.target.value });
  };

  handleAddSkill = () => {
    if (this.state.newSkill.trim()) {
      this.setState(prevState => ({
        tempProfile: {
          ...prevState.tempProfile,
          skills: [...prevState.tempProfile.skills, this.state.newSkill.trim()]
        },
        newSkill: ''
      }));
    }
  };

  handleRemoveSkill = (index) => {
    this.setState(prevState => {
      const newSkills = [...prevState.tempProfile.skills];
      newSkills.splice(index, 1);
      return {
        tempProfile: {
          ...prevState.tempProfile,
          skills: newSkills
        }
      };
    });
  };

  handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.setState(prevState => ({
          tempProfile: {
            ...prevState.tempProfile,
            picture: event.target.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  handleSave = () => {
    this.setState(
      prevState => ({
        profile: prevState.tempProfile,
        isEditing: false
      }),
      () => {
        localStorage.setItem('userProfile', JSON.stringify(this.state.profile));
      }
    );
  };

  handleCancel = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const { isEditing, profile, tempProfile, newSkill } = this.state;

    return (
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          {!isEditing ? (
            <button onClick={this.handleEditToggle} className="edit-btn">
              Edit Profile
            </button>
          ) : (
            <div className="profile-actions">
              <button onClick={this.handleCancel} className="cancel-btn">
                Cancel
              </button>
              <button onClick={this.handleSave} className="save-btn">
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="profile-content">
          <div className="profile-picture-section">
            {isEditing ? (
              <div className="picture-upload">
                <img
                  src={tempProfile.picture || profile.picture}
                  alt="Profile"
                  className="profile-picture"
                />
                <label className="upload-btn">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={this.handlePictureChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            ) : (
              <img
                src={profile.picture}
                alt="Profile"
                className="profile-picture"
              />
            )}
          </div>

          <div className="profile-details">
            {isEditing ? (
              <>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={tempProfile.name}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={tempProfile.email}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={tempProfile.bio}
                    onChange={this.handleInputChange}
                    rows="4"
                  />
                </div>
                <div className="form-group">
                  <label>Skills</label>
                  <div className="skills-input">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={this.handleSkillChange}
                      placeholder="Add a skill"
                    />
                    <button
                      type="button"
                      onClick={this.handleAddSkill}
                      className="add-skill-btn"
                    >
                      Add
                    </button>
                  </div>
                  <div className="skills-list">
                    {tempProfile.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                        <button
                          onClick={() => this.handleRemoveSkill(index)}
                          className="remove-skill"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2>{profile.name}</h2>
                <p className="profile-email">{profile.email}</p>
                <div className="profile-bio">
                  <h3>About Me</h3>
                  <p>{profile.bio}</p>
                </div>
                <div className="profile-skills">
                  <h3>Skills</h3>
                  <div className="skills-list">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;