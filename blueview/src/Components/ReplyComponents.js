import React from 'react';
import './Post.css';

// Individual replies to each post.
class Reply extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        user: 'Jen Richards',
        time: '16:43',
        text: 'This is a reply this is a reply this is a reply this is a reply this is a reply this is a reply this is a reply this is a reply this is a reply this is a reply'
      }
    }

    // Consists of a title bar with timestamp, and a text body
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

// Small form for creating a new reply
class NewReply extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        text: ''
      }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
     // Update the state when the user types
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  // Called when the submit button is pressed
    handleSubmit(event) {
      event.preventDefault();
      alert("Text: " + this.state.text);
      console.log("This is it?")
      //TODO: Create and add new reply
      this.props.cancelReply(); // Hide new post form
    }
  // Consists of a form with a text field, a cancel button, and a post button
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

// Container for all replies for a post. Also includes the NewReply form, which is hidden by default.
class ReplyFeed extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        creatingReply: false
      }
  
      this.startNewReply = this.startNewReply.bind(this);
      this.cancelReply = this.cancelReply.bind(this);
    }
  // Shows the NewReply component by updating the state.
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
    // Consists of a simple header, a NewReply form, and any number of replies.
    render() {
      const {replies} = this.props.replies;
      console.log(this.props.replies);
      return (
        <div className="replyFeedBody">
          <div className="replyFeedHeader">
            <span className="replyFeedHeaderLabel">Replies</span>
            <span className="startReply" onClick={this.startNewReply}>New Reply</span>
          </div>
          {this.state.creatingReply && (<NewReply cancelReply={this.cancelReply} />)}
          {/* {replies.map(reply => (
            <Reply title={reply.title} date={reply.created_at.substring(0, reply.created_at.indexOf('T'))} 
            user={reply.user_id} text={reply.body} id={reply.id}  />
          ))}; */}
        </div>
      );
    }
  }
export default ReplyFeed;