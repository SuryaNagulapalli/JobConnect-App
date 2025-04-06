import React, { Component } from 'react';
import './index.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      isLoading: false
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: { ...this.state.errors, [e.target.name]: '' }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;
    const errors = {};

    // Validation
    if (!name) errors.name = 'Full name is required';
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    this.setState({ isLoading: true });

    // Simulate API call
    setTimeout(() => {
      console.log('Signup attempt with:', { name, email, password });
      this.setState({ isLoading: false });
      // Redirect or handle successful signup here
    }, 1500);
  };

  render() {
    const { name, email, password, confirmPassword, errors, isLoading } = this.state;

    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Create Your Account</h2>
          
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={this.handleChange}
                className={errors.name ? 'input-error' : ''}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                className={errors.email ? 'input-error' : ''}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                className={errors.password ? 'input-error' : ''}
                placeholder="Create a password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                className={errors.confirmPassword ? 'input-error' : ''}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </button>
            </div>

            <div className="auth-footer">
              <p>Already have an account? <a href="/login">Log in</a></p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;