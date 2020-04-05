import React from 'react';
// import logo from './logo.svg';
import './ZipSearch.css';

class ZipSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''}

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
  }

  render() {
    return (
      <div className="main">
        <div className="zipContainer">
          <h2 className="zipSubtitle">Enter Your Zipcode</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="zipcode" className="zipField" value={this.state.zipcode} onChange={this.updateZip} />
            <input type="submit" value="ENTER" className="zipSubmit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default ZipSearch;
