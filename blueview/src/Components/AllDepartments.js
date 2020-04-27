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

  deptRedirect(event) {
    alert("Redirect to corresponding department page");
    this.setState({toDep:true});
  }

  // GET THE INFORMATION FOR EACH FROM PROPS PASSED FROM DepartmentList
  render() {
    const {toDep} = this.state;
    if(toDep){
      return <Redirect to={'/DepartmentPage/' + this.props.id}/>
    }
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

class DepartmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments:null
    };
  }
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

class AllDeptContent extends React.Component {
  render() {
    // Parent of PostFeed
    return (
      <div className="allDeptContent">
        <div className="centerBox">
          <DepartmentList />
        </div>
      </div>
    );
  }
}

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