import React from 'react';
// import logo from './logo.svg';
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''}

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateUsername(event) {
    this.setState({username: event.target.value});
  }

  updatePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    alert('Username: ' + this.state.username + "\nPassword: " + this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <div className="main">
        <div className="signInContainer">
          <h1 className="signInTitle">BlueView</h1>
          <h2 className="signInSubtitle">Sign In</h2>
          <form onSubmit={this.handleSubmit}>
            <label for="username">Username:</label>
            <input type="text" id="username" className="signInField" value={this.state.username} onChange={this.updateUsername} />
            <label for="password">Password:</label>
            <input type="password" id="password" className="signInField" value={this.state.password} onChange={this.updatePassword} />
            <input type="submit" value="Submit" className="signInSubmit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
