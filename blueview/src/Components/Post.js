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
  }
  /* This is unnecessary. Grab the prop directly when you render.
  componentDidMount() {
    this.setState({user: this.props.user});
    this.setState({date: this.props.date});
    this.setState({title: this.props.title});
    this.setState({text: this.props.text});
  }
  */


  // VERSION USING STATE
  /*
  render() {
    return (
      <div className="postBox">
        <div className="postInfo">
           <span className="postTitle">{this.state.title}</span> on {this.state.date}
           <a className="userName">{this.state.user}</a>
        </div>
        <p className="postBody">
          {this.state.text}
        </p>
      </div>
    );
  }
  */


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
}

export default Post;
