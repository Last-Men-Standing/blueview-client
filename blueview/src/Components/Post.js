import React from 'react';
import { Redirect } from 'react-router-dom'
// import logo from './logo.svg';
import './Post.css';

class Post extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: 'User Name', 
      date: '2020-05-17',
      title: 'Post Title',
      text: 'This is the body of the post. This is the body of the post. This is the body of the post. This is the body of the post. This is the body of the post. This is the body of the post.'
    }
    
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
  
  /*
  render() {
    return (
      <div className="postBox">
        <p className="postInfo">
          <span className="postTitle">{this.props.title}</span> on {this.props.date}
          <a className="userName">{this.props.user}</a>
        </p>
        <p className="postBody">
          {this.props.text}
        </p>
      </div>
    );
  }
  */
}

export default Post;
