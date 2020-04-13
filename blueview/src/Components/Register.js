import React from 'react';
// import logo from './logo.svg';
import './Register.css';
import baseUrl from '../Utils/config';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPw: '',
      errors: {}
    }

    this.onUpdate = this.onUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.alreadyUser = this.alreadyUser.bind(this);
  }

  onUpdate(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(`${baseUrl}/account/register`, {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      username: this.state.username,
      password: this.state.password,
      password_2: this.state.confirmPw
    }).then(res => {
      console.log(res);
    }).catch(error => {
      this.setState({ errors: error.response.data.errors });
    });
  }

  alreadyUser(event) {
    alert("Already a user!");
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="main">
        <div className="registerContainer">
          <h1 className="registerTitle">BlueView</h1>
          <h2 className="registerSubtitle">Create Account</h2>
          <form onSubmit={this.handleSubmit}>
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" className="registerField" value={this.state.firstName} onChange={this.onUpdate} />
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" className="registerField" value={this.state.lastName} onChange={this.onUpdate} />
            <label for="username">Username:</label>
            <input type="text" id="username" className="registerField" value={this.state.username} onChange={this.onUpdate} />
            <label for="password">Password:</label>
            <input type="password" id="password" className="registerField" value={this.state.password} onChange={this.onUpdate} />
            <label for="confirmPw">Confirm Password:</label>
            <input type="password" id="confirmPw" className="registerField" value={this.state.confirmPw} onChange={this.onUpdate} />
            <input type="submit" value="ENTER" className="registerSubmit" />
          </form>
          <a className="alreadyUser" onClick={this.alreadyUser}>Already have an account? Sign in here!</a>
        </div>
      </div>
    );
  }
}


export default Register;
