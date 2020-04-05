import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Post from './Post';
import * as serviceWorker from './serviceWorker';
import DepartmentPage from './DepartmentPage';
import Register from './Register';
import ZipSearch from './ZipSearch'

ReactDOM.render(
  <React.StrictMode>
    <ZipSearch />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
