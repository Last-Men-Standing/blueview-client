import React from 'react';
// import logo from './logo.svg';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '', 
      password: '',
      confirmPw: ''
    }

    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateLastName = this.updateLastName.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateConfirmPw = this.updateConfirmPw.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.alreadyUser = this.alreadyUser.bind(this);
  }

  updateFirstName(event) {
    this.setState({firstName: event.target.value});
  }

  updateLastName(event) {
    this.setState({lastName: event.target.value});
  }

  updateUsername(event) {
    this.setState({username: event.target.value});
  }

  updatePassword(event) {
    this.setState({password: event.target.value});
  }

  updateConfirmPw(event) {
    this.setState({confirmPw: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    alert("First Name: " + this.state.firstName + 
          "\nLast Name: " + this.state.lastName +
          "\nUsername: " + this.state.username +
          "\nPassword: " + this.state.password +
          "\nConfirm: " + this.state.confirmPw);
  }

  alreadyUser(event) {
    alert("Already a user!");
  }

  render() {
    return (
      <div className="main">
        <div className="registerContainer">
          <h1 className="registerTitle">BlueView</h1>
          <h2 className="registerSubtitle">Create Account</h2>
          <form onSubmit={this.handleSubmit}>
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" className="registerField" value={this.state.firstName} onChange={this.updateFirstName} />
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" className="registerField" value={this.state.lastName} onChange={this.updateLastName} />
            <label for="username">Username:</label>
            <input type="text" id="username" className="registerField" value={this.state.username} onChange={this.updateUsername} />
            <label for="password">Password:</label>
            <input type="password" id="password" className="registerField" value={this.state.password} onChange={this.updatePassword} />
            <label for="confirmPw">Confirm Password:</label>
            <input type="password" id="confirmPw" className="registerField" value={this.state.confirmPw} onChange={this.updateConfirmPw} />
            <input type="submit" value="ENTER" className="registerSubmit"/>
          </form>
          <a className="alreadyUser" onClick={this.alreadyUser}>Alredy have an account? Sign in here!</a>
        </div>
      </div>
    );
  }
}

export default Register;
