import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      company: '',
      location: '',
      salary: '',
      description: '',
      error: null,
      success: false
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'salary') {
      // Only allow empty string or positive integers
      if (value === '' || /^[0-9]+$/.test(value)) {
        this.setState({ 
          [name]: value,
          error: null
        });
      }
    } else {
      this.setState({ 
        [name]: value,
        error: null
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, company, location, salary, description } = this.state;
    
    if (!title || !company || !location || !description) {
      this.setState({ error: "Please fill in all required fields" });
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/post-jobs`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          title,
          company,
          location,
          salary: salary ? parseInt(salary) : null,
          description
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to post job");
      }

      const data = await response.json();
      console.log("Success:", data);
      
      this.setState({
        title: '',
        company: '',
        location: '',
        salary: '',
        description: '',
        success: true,
        error: null
      });

      toast.success("Job posted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => this.setState({ success: false }), 3000);
      
    } catch (error) {
      console.error("Error submitting job:", error);
      this.setState({ 
        error: error.message || "Failed to submit job posting",
        success: false
      });
      toast.error(error.message || "Failed to submit job posting");
    }
  };

  render() {
    const { title, company, location, salary, description, error } = this.state;

    return (
      <div className="post-job-container">
        <h2 className="form-title">Post a New Job</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={this.handleSubmit} className="job-form">
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
            placeholder="Job Title"
            className="form-input"
            required
          />
          <input
            type="text"
            name="company"
            value={company}
            onChange={this.handleChange}
            placeholder="Company Name"
            className="form-input"
            required
          />
          <input
            type="text"
            name="location"
            value={location}
            onChange={this.handleChange}
            placeholder="Location"
            className="form-input"
            required
          />
          <input
            type="text"
            name="salary"
            value={salary}
            onChange={this.handleChange}
            placeholder="Salary"
            className="form-input"
            pattern="[0-9]*"
          />
          <textarea
            name="description"
            value={description}
            onChange={this.handleChange}
            placeholder="Job Description"
            className="form-textarea"
            required
          />
          <button type="submit" className="submit-button">
            Post Job
          </button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default PostJob;
