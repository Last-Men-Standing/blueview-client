import React from 'react';
import baseUrl from '../Utils/config'
import axios from 'axios';
import Header from './Header.js';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1>This will be the home page soon</h1>
      </div>
    );
  }
}

export default HomePage;