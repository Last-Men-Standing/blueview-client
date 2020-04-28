import React from 'react';
import { Redirect } from 'react-router-dom'
import baseUrl from '../Utils/config'
import axios from 'axios';
import './ZipSearch.css';

class ZipSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {zipcode:'', toDepartmentPage: false, department: null}

    this.updateZip = this.updateZip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Updates state when user types
  updateZip(event) {
    this.setState({zipcode: event.target.value});
  }

  // Called when user presses submit button
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.zipcode);
    axios.get(`${baseUrl}/department/zipcode/${this.state.zipcode}`)
      .then(res => {
        const data = res.data
        console.log(data.department[0]);
        this.setState({department: data.department[0]});
        this.setState({toDepartmentPage: true});
      })
      console.log("exit");
  }
  
  render() {
    if (this.state.toDepartmentPage) {
      console.log("page hit");
      const path = '/DepartmentPage/'+ this.state.department.id;
      console.log(path);
      return <Redirect to={path}/>;
      
    }
    
    // Consists of a simple box with a field and submit button
    return (
      <React.Fragment>
        <div className="main">
          <div className="zipContainer">
            <h2 className="zipSubtitle">Enter Your Zipcode</h2>
            <form onSubmit={this.handleSubmit}>
              <input type="text" id="zipcode" className="zipField" value={this.state.zipcode} onChange={this.updateZip} />
              <input type="submit" value="ENTER" className="zipSubmit"/>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ZipSearch;
