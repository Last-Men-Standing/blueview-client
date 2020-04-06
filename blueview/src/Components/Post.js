import React from 'react';
import { Redirect } from 'react-router-dom'
// import logo from './logo.svg';
import './Post.css';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Rachel Beenest', 
      date: '2020-05-17',
      title: 'Post Title',
      text: 'The police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer.'
    }

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
      <div className="postBox">
        <p className="postInfo">
           <span className="postTitle">{this.state.title}</span> on {this.state.date}
           <a className="userName">{this.state.user}</a>
        </p>
        <p className="postBody">
          {this.state.text}
        </p>
      </div>
    );
  }
}

export default Post;
