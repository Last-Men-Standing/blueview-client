import React from 'react';
// import logo from './logo.svg';
import './Register.css';
import { Redirect } from 'react-router-dom'
import baseUrl from '../Utils/config';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      password_2: '',
      errors: {},
      toSignIn: false,

      invalidFirst: false,  // For error messages
      invalidLast: false,
      userLength: false,
      badPass: false,

      token: localStorage.getItem('jwt-token') || '',
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
    console.log("Submitting");
    console.log(this.state);
    axios.post(`${baseUrl}/account/register`, {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      username: this.state.username,
      password: this.state.password,
      password_2: this.state.password_2
    }).then(res => {
      console.log("Signing In");
      console.log(res);
      this.setState({toSignIn: true});
      console.log("Token:",res.data.credentials.split(' ')[1]);
      localStorage.setItem('jwt-token',res.data.credentials.split(' ')[1]);
    }).catch(error => {
      console.log("Sign In Error");
      console.log(error);
      this.setState({ errors: error });
      
    });
  }

  alreadyUser(event) {
    this.setState({toSignIn: true});
  }

  render() {
    const { errors } = this.state;
    const { toSignIn } = this.state;
    const p = '/';
    if(toSignIn){
      return <Redirect to={p}/>
    }
    return (
      <div className="main">
        <div className="registerContainer">
          <h1 className="registerTitle">BlueView</h1>
          <h2 className="registerSubtitle">Create Account</h2>
          <form onSubmit={this.handleSubmit}>
            <label for="first_name">First Name:</label>
            <input type="text" id="first_name" className="registerField" value={this.state.first_name} onChange={this.onUpdate} />

            {this.state.invalidFirst && (
              <p className="errorMessage">Invalid first name.</p>
            )}

            <label for="last_name">Last Name:</label>
            <input type="text" id="last_name" className="registerField" value={this.state.last_name} onChange={this.onUpdate} />

            {this.state.invalidLast && (
              <p className="errorMessage">Invalid last name.</p>
            )}
            
            <label for="username">Username:</label>
            <input type="text" id="username" className="registerField" value={this.state.username} onChange={this.onUpdate} />

            {this.state.userLength && (
              <p className="errorMessage">Username must be between 2 and 20 characters.</p>
            )}

            <label for="password">Password:</label>
            <input type="password" id="password" className="registerField" value={this.state.password} onChange={this.onUpdate} />
            <label for="password_2">Confirm Password:</label>
            <input type="password" id="password_2" className="registerField" value={this.state.password_2} onChange={this.onUpdate} />

            {((this.state.password != this.state.password_2 && this.state.password_2 != '') ||
                this.state.badPass) && (
              <p className="errorMessage">Passwords must match and cannot be empty.</p>
            )}

            <input type="submit" value="ENTER" className="registerSubmit" />
          </form>
          <a className="alreadyUser" onClick={this.alreadyUser}>Already have an account? Sign in here!</a>
        </div>
      </div>
    );
  }
}

export default Register;
