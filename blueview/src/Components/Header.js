import React from 'react';
import baseUrl from '../Utils/config'
import axios from 'axios';
import './Header.css';
import { Redirect } from 'react-router-dom'

// Topmost header of the page
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: (localStorage.getItem('jwt-token')||'' != ''),
      zip: '',
      redirectHome: false,
      redirectSignin:false
    }
    
    this.goAllDepts = this.goAllDepts.bind(this);
    this.handleZipTyping = this.handleZipTyping.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.goHome = this.goHome.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  goAllDepts(event) {
    alert("Redirect to all departments page");
  }

  handleZipTyping(event) {
    this.setState({
      zip: event.target.value
    });
  }

  handleSearch(event) {
    event.preventDefault();
    alert("Search");
  }

  goHome(event) {
    alert("Redirect to homepage");
    this.setState({redirectHome:true});
  }

  signIn(event) {
    alert("Sign In");
    this.setState({redirectSignin:true});
  }

  signOut(event) {
    alert("Sign Out");
    localStorage.removeItem('jwt-token');
    this.setState({redirectSignin:true});
  }

  // Consists of the logo, a search placeholder, and the sign in/out button (not yet linked)
  render() {
    const loggedIn = this.state.loggedIn;
    let accountControl;
    if (loggedIn) {
      accountControl = <a className="signOutButton" onClick={this.signOut}>Sign Out</a>;
    } else {
      accountControl = <a className="signInButton" onClick={this.signIn}>Sign In</a>;
    }
    const {redirectHome} = this.state;
    const {redirectSignin} = this.state;

    if(redirectHome){
      console.log("this should happen");
      return <Redirect to={'/Home'}/>
    }
    if(redirectSignin){
        return <Redirect to={'/SignIn'}/>
    }

    return (
      <div className="headerBody">
        <p className="logo" onClick={this.goHome}>BlueView</p>
        <form onSubmit={this.handleSearch} className="zipHeaderForm">
          <input className="zipHeaderField" placeholder="Enter a ZIP code" type="text" value={this.state.zip} name="zipHeaderField" onChange={this.handleZipTyping} />
          <input className="zipHeaderButton" type="submit" value="GO" />
        </form>
        <a className="deptListButton" onClick={this.goAllDepts}>All Departments</a>
        {accountControl}
      </div>
    );
  }
}

export default Header;