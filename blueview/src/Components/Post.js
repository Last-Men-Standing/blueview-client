import React from 'react';
import { Redirect } from 'react-router-dom'
// import logo from './logo.svg';
import './Post.css';

class PostRatings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholderRating: 2.4
    }
  }

  // Pass the ratings down as props through the post component

  render() {
    return (
      <div className="postRatingsBody">
        <div className="postRatingContainer">
          <p className="rating">Attitude: <span className="ratingNumber">{this.state.placeholderRating}</span></p>
          <p className="rating">Communication: <span className="ratingNumber">{this.state.placeholderRating}</span></p>
          <p className="rating">Efficiency: <span className="ratingNumber">{this.state.placeholderRating}</span></p>
        </div>
        <div className="postRatingContainer">
          <p className="rating">Fairness: <span className="ratingNumber">{this.state.placeholderRating}</span></p>
          <p className="rating">Safety: <span className="ratingNumber">{this.state.placeholderRating}</span></p>
          <p className="rating">Overall: <span className="ratingNumber">{this.state.placeholderRating}</span></p>
        </div>
      </div>
    );
  }
}


class Reply extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 'Jen Richards',
      time: '16:43',
      text: 'This is a reply this is a reply this is a reply this is a reply this is a reply this is a reply this is a reply this is a reply this is a reply this is a reply'
    }
  }

  render() {
    return (
      <div className="replyBody">
        <div className="postInfo">
          <a className="userName">{this.state.user}</a> at {this.state.time}
        </div>
        
        <p className="postBody">
          {this.state.text}
        </p>
      </div>
    );
  }
}

class NewReply extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Text: " + this.state.text);
    console.log("This is it?")
    //TODO: Create and add new reply
    this.props.cancelReply(); // Hide new post form
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
         <textarea className="newReplyText" value={this.state.text} name="text" onChange={this.handleChange} />
         
         <div className="newReplyControls">
            <button className="cancelReply" onClick={this.props.cancelReply}>Cancel</button>
            <input className="submitReply" type="submit" value="Post" />
          </div>
      </form>
    );
  }
}


class ReplyFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      creatingReply: false
    }

    this.startNewReply = this.startNewReply.bind(this);
    this.cancelReply = this.cancelReply.bind(this);
  }

  startNewReply() {
    this.setState({
      creatingReply: true
    })
  }

  cancelReply() {
    this.setState({
      creatingReply: false
    });
  }

  render() {
    return (
      <div className="replyFeedBody">
        <div className="replyFeedHeader">
          <span className="replyFeedHeaderLabel">Replies</span>
          <span className="startReply" onClick={this.startNewReply}>New Reply</span>
        </div>
        {this.state.creatingReply && (<NewReply cancelReply={this.cancelReply} />)}
        <Reply />
        <Reply />
        <Reply />
        <Reply />
      </div>
    );
  }
}


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Post Title',
      date: '2020-05-17',
      user: 'Rachel Beenest', 
      tag: 'Emergency Response',
      text: 'The police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer the police officer.',
      ratingsVisible: false,
      repliesVisible: false
    }

    this.toggleRatings = this.toggleRatings.bind(this);
    this.toggleReplies = this.toggleReplies.bind(this);
  }
  
  /* I think this is unnecessary. You should be able to grab the props directly in render()
     Ideally state will only be used for the mutable aspects of the component, like the visibility booleans
  */
  componentDidMount() {
    this.setState({user: this.props.user});
    this.setState({date: this.props.date});
    this.setState({title: this.props.title});
    this.setState({text: this.props.text});
  }

  toggleRatings() {
    var current = this.state.ratingsVisible;

    this.setState({
      ratingsVisible: !current
    });
  }

  toggleReplies() {
    var current = this.state.repliesVisible;
    //TODO: Fetch replies
    this.setState({
      repliesVisible: !current
    });
  }

  // REPLACE RELEVANT STATE VARIABLES WITH PROPS
  render() {
    return (
      <div className="postBox">

        <div className="postInfo">
           <span className="postTitle">{this.state.title}</span> on {this.state.date} by&nbsp;
           <a className="userName">{this.state.user}</a>
           <span className="postTag">{this.state.tag}</span>
        </div>

        <p className="postBody">
          {this.state.text}
        </p>

        {this.state.ratingsVisible && (<PostRatings />)}
        {this.state.repliesVisible && (<ReplyFeed />)}

        <div className="postControls">
          <p className="toggleRatings" onClick={this.toggleRatings}>
            {this.state.ratingsVisible ? "Hide Ratings" : "Show Ratings"}
          </p>
          <p className="toggleReplies" onClick={this.toggleReplies}>
            {this.state.repliesVisible ? "Hide Replies" : "Show Replies"}
          </p>
        </div>

      </div>
    );
  }
}

export default Post;
