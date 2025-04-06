import React, { Component } from 'react';
import './index.css';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      loading: true,
      error: null,
      searchTerm: '',
      locationFilter: '',
    };
  }

  componentDidMount() {
    this.fetchJobs();
  }

  fetchJobs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/alljobs`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      this.setState({ jobs: data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleLocationChange = (e) => {
    this.setState({ locationFilter: e.target.value });
  };

  render() {
    const { jobs, loading, error, searchTerm, locationFilter } = this.state;

    // Filter jobs based on search criteria
    const filteredJobs = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = locationFilter === '' || 
                            job.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      return matchesSearch && matchesLocation;
    });

    if (loading) {
      return <div className="loading">Loading jobs...</div>;
    }

    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    return (
      <div className="all-jobs-container">
        <div className="job-filters">
          <input
            type="text"
            placeholder="Search jobs, companies, or keywords"
            value={searchTerm}
            onChange={this.handleSearchChange}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Filter by location"
            value={locationFilter}
            onChange={this.handleLocationChange}
            className="location-input"
          />
        </div>

        <div className="job-cards-container">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <h3 className="job-title">{job.title}</h3>
                  <span className="company-name">{job.company}</span>
                </div>
                <div className="job-details">
                  <span className="job-location">
                    <i className="fas fa-map-marker-alt"></i> {job.location}
                  </span>
                  {job.salary && (
                    <span className="job-salary">
                      <i className="fas fa-money-bill-wave"></i> ₹{job.salary.toLocaleString()}/year
                    </span>
                  )}
                </div>
                <div className="job-description">
                  {job.description.length > 150 
                    ? `${job.description.substring(0, 150)}...` 
                    : job.description}
                </div>
                <button className="apply-button">Apply Now</button>
                <button className="save-button">
                  <i className="far fa-bookmark"></i> Save
                </button>
              </div>
            ))
          ) : (
            <div className="no-jobs">No jobs found matching your criteria</div>
          )}
        </div>
      </div>
    );
  }
}

export default Jobs;
