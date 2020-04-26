import React from 'react';
import baseUrl from '../Utils/config'
import axios from 'axios';
import Header from './Header.js';
import PostFeed from './PostComponents.js';
import './DepartmentPage.css';



// Displays the aggregated ratings for the department
class DepartmentRatings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {    // REPLACE WITH PROPS WHEN IMPLEMENTED
      attitude: 4.3,
      communication: 4.3,
      efficiency: 4.3,
      fairness: 4.3,
      safety: 4.3,
    }
  }

  componentDidMount() {
    axios.get(`${baseUrl}/department/${this.props.id}/rating`)
      .then(res => {
        const data = res.data.rating;
        console.log("DeptRating Mount");
        console.log(data);
        if(data.attitude != null){
          this.setState({ attitude: data.attitude.toFixed(2) || 4.3});
          this.setState({ communication: data.communication.toFixed(2) || 4.3});
          this.setState({ efficiency: data.efficiency.toFixed(2) || 4.3});
          this.setState({ fairness: data.fairness.toFixed(2) || 4.3});
          this.setState({ safety: data.safety.toFixed(2) || 4.3});
          this.setState({ overall: data.overall.toFixed(2) || 4.3});
        }
      });
  }
  
  render() {
    return (
      <div className="ratingsContainer">
        <p className="rating">Attitude: <span className="ratingNumber">{this.state.attitude}</span></p>
        <p className="rating">Communication: <span className="ratingNumber">{this.state.communication}</span></p>
        <p className="rating">Efficiency: <span className="ratingNumber">{this.state.efficiency}</span></p>
        <p className="rating">Fairness: <span className="ratingNumber">{this.state.fairness}</span></p>
        <p className="rating">Safety: <span className="ratingNumber">{this.state.safety}</span></p>
        <p className="rating">Overall: <span className="ratingNumber">{this.state.overall}</span></p>
      </div>
    );
  }
}

// Main header for any department page.
class DepartmentHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "dummy", name: "South Glens Falls Police Department", address: "5 W Marion Ave, South Glens Falls, NY", zipcode: "", overall_rating: "" };

  }

// Make API call to get department information after mounting. Updates state which triggers a rerender.
  componentDidMount() {
    axios.get(`${baseUrl}/department/${this.props.id}`)
      .then(res => {
        const data = res.data.department[0]
        console.log(data);
        this.setState({ id: this.props.id });
        this.setState({ name: data.name });
        this.setState({ address: data.address });
        // return {id: this.props.id, name: data.name, address: data.address};
      })
  }

  // Consists of department name and address with a DepartmentRatings component
  render() {
    return (
      <div className="departmentHeaderMain">
        <div className="centerBox">
          <div className="nameAddress">
            <h1 className="departmentName">{this.state.name}</h1>
            <h2 className="departmentAddress">{this.state.address}</h2>
          </div>
          {/* <h3 className="id">{this.state.id}</h3> */}
          <DepartmentRatings id={this.props.id} />
        </div>
      </div>
    );
  }
}

// Everything below the header in a department page.
class DepartmentContent extends React.Component {
  constructor(props) {
    super(props);
  }

    // Currently only contains a PostFeed component
  render() {
    // Parent of PostFeed
    return (
      <div className="departmentContentMain">
        <div className="centerBox">
          <PostFeed id={this.props.id} isHomepage={false}/>
        </div>
      </div>
    );
  }
}

// The entire department page.
class DepartmentPage extends React.Component {
  constructor(props) {
    super(props);
  }
  // Consists of the topmost header, the department-specific header, and the department content
  render() {
    // Parent of DepartmentContent
    console.log(this.props);
    return (
      <div className="departmentPageMain">
        <Header />
        <DepartmentHeader id={this.props.match.params.id} />
        <DepartmentContent id={this.props.match.params.id} />
      </div>
    );
  }
}

export default DepartmentPage;
