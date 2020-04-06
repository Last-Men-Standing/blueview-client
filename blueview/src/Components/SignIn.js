import React from 'react';
import { Redirect } from 'react-router-dom'
// import logo from './logo.svg';
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '',toZipSearch: false}

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.notUser = this.notUser.bind(this);
  }

  updateUsername(event) {
    this.setState({username: event.target.value});
  }

  updatePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('Username: ' + this.state.username + "\nPassword: " + this.state.password);
    this.setState({toZipSearch: true});
  }

  notUser(event) {
    alert("Not a user!");
  }

  render() {
    const { toZipSearch } = this.state;

      if (toZipSearch) {
        return <Redirect to='/ZipSearch'/>;
      }
    return (
      
      <React.Fragment>
        <div className="main">
          <div className="signInContainer">
            <h1 className="signInTitle">BlueView</h1>
            <h2 className="signInSubtitle">Sign In</h2>
            <form onSubmit={this.handleSubmit}>
              <label for="username">Username:</label>
              <input type="text" id="username" className="signInField" value={this.state.username} onChange={this.updateUsername} />
              <label for="password">Password:</label>
              <input type="password" id="password" className="signInField" value={this.state.password} onChange={this.updatePassword} />
              <input type="submit" value="ENTER" className="signInSubmit"/>
            </form>
            <a className="notUser" onClick={this.notUser}>Don't have an account? Sign up here!</a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignIn;
