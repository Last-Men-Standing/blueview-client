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
          <p className="deptListTitle">Department Name Sheriff's Department</p>
          <p className="deptListInfo">123 Department Address, Town, ST 01234</p>
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
            <p className="deptRating">Overall: <span className="deptRatingNumber">0.0</span></p>
          </div>
        </div>
      </div>
    );
  }
}



class DepartmentList extends React.Component {
  render() {
    return(
      <div>
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
        <DepartmentListItem />
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