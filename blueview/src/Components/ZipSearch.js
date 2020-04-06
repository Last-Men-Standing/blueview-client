import React from 'react';
import { Redirect } from 'react-router-dom'
// import logo from './logo.svg';
import './ZipSearch.css';
class ZipSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', toDepartmentPage: false}

    this.updateZip = this.updateZip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateUsername(event) {
    this.setState({username: event.target.value});
  }

  updateZip(event) {
    this.setState({zipcode: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('Zip Code: ' + this.state.zipcode);
    const data = {
      zipcode: this.state.zipcode
    }
    // axios.get('http://localhost:3000/department/zipcode/:zipcode', data)
    //     .then(res => console.log(res.data));
    this.setState({toDepartmentPage: true});
  }
  
  render() {
    const { toDepartmentPage } = this.state;

    if (toDepartmentPage) {
      return <Redirect to='/DepartmentPage'/>;
    }
    
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
