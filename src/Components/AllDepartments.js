import React from 'react';
import baseUrl from '../Utils/config';
import axios from 'axios';
import Header from './Header.js';
import './AllDepartments.css';
import { Redirect } from 'react-router-dom'

// Custom big header for this page. Simply says "All Police Departments"
class AllDeptHeader extends React.Component {
  render() {
    return (
      <div className="allDeptHeader">
        <div className="centerBox">
          <h1 className="allDeptTitle">All Police Departments</h1>
        </div>
      </div>
    );
  }
}

// A single department entry in the list
class DepartmentListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toDep:false
    };

    this.deptRedirect = this.deptRedirect.bind(this);
  }

  // Redirect to corresponding department page
  deptRedirect(event) {
    this.setState({toDep:true});
  }

  render() {
    const {toDep} = this.state;

    // Redirect
    if (toDep) {
      return <Redirect to={'/DepartmentPage/' + this.props.id}/>
    }

    // Consists of the department name and address, and its overall rating
    return(
      <div className="deptListItem" onClick={this.deptRedirect}>
        <div className="deptListNameAddress">
          <p className="deptListTitle">{this.props.name}</p>
          <p className="deptListInfo">{this.props.address} {this.props.zipcode}</p>
        </div>
        <div className="deptListRating">
          <p className="deptRating">Overall Rating: <span className="deptRatingNumber">{this.props.rating}</span></p>
        </div>
      </div>
    );
  }
}

// List of all returned departments
class DepartmentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      departments:null
    };
  }

  // Make API call after component mounts
  componentDidMount() {
    axios.get(`${baseUrl}/department/all`)
      .then(res => {
        console.log(res.data.departments);
        this.setState({departments:res.data.departments});
      });
  }

  render() {
    // Address, name, overall_rating, zipcode
    const {departments} = this.state;

    return(
      <div>
        {departments != null && departments.map(department => (
          <DepartmentListItem name={department.name} address={department.address} 
          rating={department.overall_rating} zipcode={department.zipcode} id={department.id}/>
        ))}
      </div>
    );
  }
}

// Contains everything below the header on this page
class AllDeptContent extends React.Component {
  render() {
    return (
      <div className="allDeptContent">
        <div className="centerBox">
          <DepartmentList />
        </div>
      </div>
    );
  }
}

// Render all page elements
class AllDepartmentsPage extends React.Component {
  render() {
    return (
      <div className="allDeptMain">
        <Header />
        <AllDeptHeader />
        <AllDeptContent />
      </div>
    );
  }
}

export default AllDepartmentsPage;