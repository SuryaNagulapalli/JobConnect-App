import { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Header extends Component {
  state = {
    isMenuOpen: false,
  };

  toggleMenu = () => {
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  render() {
    const { isMenuOpen } = this.state;

    return (
      <div className="navbar-container">
        <div className="logo-section">
          <div className="logo">
            <div className="logo-icon">
              <div className="dot"></div>
              <div className="line"></div>
              <div className="dot"></div>
            </div>
            <span className="logo-text">JobConnect</span>
          </div>
        </div>

        {/* Hamburger Menu Button */}
        <button className="hamburger" onClick={this.toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navbar Items */}
        <ul className={`navbar-items ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link className="nav-link" to="/profile" onClick={this.toggleMenu}>
              Profile
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/post-job" onClick={this.toggleMenu}>
              Post Job
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/jobs" onClick={this.toggleMenu}>
              Jobs
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/login" onClick={this.toggleMenu}>
              Login
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/signup" onClick={this.toggleMenu}>
              Signup
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;