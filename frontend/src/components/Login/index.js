import React, { Component } from 'react';
import './index.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    const { email, password } = this.state;
    const errors = {};

    // Validation
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    this.setState({ isLoading: true });

    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt with:', { email, password });
      this.setState({ isLoading: false });
      // Redirect or handle successful login here
    }, 1500);
  };

  render() {
    const { email, password, errors, isLoading } = this.state;

    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Login to Your Account</h2>
          
          <form onSubmit={this.handleSubmit}>
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
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <div className="auth-footer">
              <p>Don't have an account? <a href="/signup">Sign up</a></p>
              <p><a href="/forgot-password">Forgot password?</a></p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;