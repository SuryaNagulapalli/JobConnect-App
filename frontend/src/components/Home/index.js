import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class Home extends Component{
  render(){
    return(
      <>
        <Header />
        <section className="hero-section">
        <div className="hero-content">
          <h1>Land Your <span className="highlight">Dream Job</span> Today</h1>
          <p className="subtitle">
            Join thousands of professionals who found their perfect career match with us.
            Start your journey now!
          </p>
          <div className="cta-buttons">
            <Link to="/jobs" className="primary-btn">Browse Jobs</Link>
            <Link to="/profile" className="secondary-btn">Create Profile</Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
            alt="Happy professionals working" 
          />
        </div>
      </section>
      </>
    )
  }
}

export default Home