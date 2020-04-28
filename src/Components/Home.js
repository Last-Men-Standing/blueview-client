import React from 'react';
import baseUrl from '../Utils/config'
import axios from 'axios';
import Header from './Header.js';
import PostFeed from './PostComponents.js';
import './Home.css';

class HomePage extends React.Component {
  render() {
    var desc = 'Create an account or sign in to contribute!';
    if((localStorage.getItem('jwt-token') || '') != ''){
      desc = 'Post your recent experinces and help make your community a better place!'
    }
    return (
      <div>
        <Header />
        <div className="homeHeader">
          <div className="centerBox">
            <p className="welcome">WELCOME TO</p>
            <p className="largeLogo">BlueView</p>
            <p className="description">
              BlueView is a community-driven place for people to share their law enforcement experiences.
            </p>
            <p className="description">
              Find your police department by searching for a ZIP code above.
            </p>
            <p className="description">
              {desc}
            </p>
          </div>
        </div>

        <div className="homeBottom">
          <div className="centerBox">
            <div className="asdf">
              <PostFeed isHomepage={true}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;