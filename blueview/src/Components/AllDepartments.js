import React from 'react';
import baseUrl from '../Utils/config';
import axios from 'axios';
import Header from './Header.js';
import './AllDepartments.css';

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

    this.deptRedirect = this.deptRedirect.bind(this);
  }

  deptRedirect(event) {
    alert("Redirect to corresponding department page");
  }

  // GET THE INFORMATION FOR EACH FROM PROPS PASSED FROM DepartmentList
  render() {
    return(
      <div className="deptListItem" onClick={this.deptRedirect}>
        <div className="deptListNameAddress">
          <p className="deptListTitle">{this.props.name}</p>
          <p className="deptListInfo">{this.props.address} {this.props.zipcode}</p>
        </div>
        <div className="deptListRatings">
          <div className="deptRatingGroup">
            <p className="deptRating">Attitude: <span className="deptRatingNumber">5.0</span></p>
            <p className="deptRating">Communication: <span className="deptRatingNumber">4.0</span></p>
            <p className="deptRating">Efficiency: <span className="deptRatingNumber">3.0</span></p>
          </div>
          <div className="deptRatingGroup">
            <p className="deptRating">Fairness: <span className="deptRatingNumber">2.0</span></p>
            <p className="deptRating">Safety: <span className="deptRatingNumber">1.0</span></p>
            <p className="deptRating">Overall: <span className="deptRatingNumber">{this.props.rating}</span></p>
          </div>
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
          rating={department.overall_rating} zipcode={department.zipcode}/>
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