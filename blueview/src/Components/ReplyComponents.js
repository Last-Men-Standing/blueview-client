import React from 'react';
import './Post.css';
import baseUrl from '../Utils/config'
import axios from 'axios';

// Individual replies to each post.
class Reply extends React.Component {
    constructor(props) {
      super(props);
  
      //  this.state = {
      //    user: 'Jen Richards',
      //    time: '16:43',
      //    text: 'This is a reply this is a reply this is a reply this is a reply this is a reply this is a reply this is a reply this is a reply this is a reply this is a reply'
      //  }
      this.state = {
       user: this.props.user,
       time: this.props.date,
       text: this.props.text
      }

      this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
      alert("DELETING REPLY");
    }

    // Consists of a title bar with timestamp, and a text body
    render() {
      // CONDITIONAL RENDERING: ONLY RENDER DELETE REPLY IF USER IS LOGGED IN
      return (
        <div className="replyBody">
          <div className="postInfo">
            <span>
              <a className="userName">{this.state.user}</a> at {this.state.time}
            </span>

            {this.state.user==localStorage.getItem('userid') && (
              <p className="deleteReply" onClick={this.handleDelete}>Delete</p>
            )}
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

      const token = localStorage.getItem('jwt-token');
      const config = { headers: { 'authorization': `Bearer ${token}` } };
      axios.post(`${baseUrl}/department/${this.props.department_id}/post/${this.props.postid}/reply`, {
        text:this.state.text
      }, config).then(res => {
        alert("New Reply Created Successfully");
        console.log("Successful reply!");
        console.log(res);
        this.setState({needsUpdate:true});
        //TODO: Handle success
      }).catch(error => {
        //TODO: handle error
        console.log(error);
        alert("Error Creating Reply");
      });
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
      const {replies} = this.props;
      return (
        <div className="replyFeedBody">
          <div className="replyFeedHeader">
            <span className="replyFeedHeaderLabel">Replies</span>
            <span className="startReply" onClick={this.startNewReply}>New Reply</span>
          </div>
          {this.state.creatingReply && (<NewReply cancelReply={this.cancelReply} postid={this.props.postid} department_id={this.props.department_id}/>)}
            {typeof replies !== "undefined" && replies.map(reply => (
              <Reply title={reply.title} date={reply.created_at.substring(0, reply.created_at.indexOf('T'))} 
              user={reply.user_id} text={reply.text} id={this.props.postid}  />
            ))}
        </div>
      );
    }
  }
export default ReplyFeed;