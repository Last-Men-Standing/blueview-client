import React from 'react';
import { Redirect } from 'react-router-dom'
// import logo from './logo.svg';
import './SignIn.css';
import baseUrl from '../Utils/config'
import axios from 'axios';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', 
      password: '',
      loggedIn: false,
      toRegister: false,
      toHome: false,
      triedIncorrect: false
    }

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
    axios.post(`${baseUrl}/account/login`, {
      username: this.state.username,
      password: this.state.password
    }).then(res=>{
      alert('Successfully logged in as user ' + this.state.username);
      localStorage.setItem('jwt-token',res.data.credentials.split(' ')[1]);
      localStorage.setItem('userid', res.data.account.id);
      console.log(res);
      console.log(res.data.credentials);
      this.setState({loggedIn: true});
      this.setState({toHome: true});
    }).catch(error =>{
      //TODO: Handle incorrect user and password
      this.setState({
        triedIncorrect: true
      });
    //TODO: Cleanup?
    });
  }

  notUser(event) {
    this.setState({toRegister: true});
  }

  render() {
    const { toRegister} = this.state;
    const {toHome} = this.state;
    if (toHome) {
      return <Redirect to={'/Home'}/>;
    }
    if(toRegister){
      return <Redirect to={'/register'}/>
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
              
              {this.state.triedIncorrect && (
                <p className="errorMessage">Incorrect username or password.</p>
              )}
              
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
