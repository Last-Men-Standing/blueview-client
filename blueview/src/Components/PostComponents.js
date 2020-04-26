import React from 'react';
import ReplyFeed from './ReplyComponents.js';
import baseUrl from '../Utils/config'
import axios from 'axios';
import './DepartmentPage.css';
import './NewPost.css';
import './Post.css';

// Header for the PostFeed that will have control options for the posts.
class PostControls extends React.Component {
  constructor(props) {
    super(props);
  }
  
  // Currently only contains a button to show the NewPost form
  render() {
    return (
      <div className="postControlsContainer">
        {this.props.isHomepage && (
          <p className="homeFeedTitle">Recent Posts</p>
        )}

        {!this.props.isHomepage && (
          <button className="createNewPostButton" onClick={this.props.showNewPost}>
            New Post
          </button>
        )}
      </div>
    );
  }
}

// Form for users to create a new post
class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      date: '',
      text: '',
      attitude: '',
      communication: '',
      efficiency: '',
      fairness: '',
      safety: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Updates the state based on user input
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Called when the user presses the post button in the form
  handleSubmit(event) {
    event.preventDefault();

    alert("Title: " + this.state.title +
      "\nDate: " + this.state.date +
      "\nText: " + this.state.text);
    const token = localStorage.getItem('jwt-token');

    const config = { headers: { 'authorization': `Bearer ${token}` } };
    const params = { params: { id: this.props.department_id } };
    axios.post(`${baseUrl}/department/${this.props.department_id}/post/create`, {
      created_at: this.state.date,
      title: this.state.title,
      body: this.state.text,
      incident_date: this.state.date,
      attitude: parseInt(this.state.attitude),
      communication: parseInt(this.state.communication),
      efficiency: parseInt(this.state.efficiency),
      fairness: parseInt(this.state.fairness),
      safety: parseInt(this.state.safety)
    }, config).then(res => {
      alert("New Post Created Successfully");
      console.log("Successful Post!");
      console.log(res);
      //TODO: Handle success
    }).catch(error => {
      //TODO: handle error
      console.log(error);
      alert("Error Creating Post");
    });
    this.props.cancelPost(); // Hide new post form
  }

  // Consists of a number of fields for all necessary post information
  // Title, date, tag, text, and ratings
  // Also includes cancel and post button
  render() {
    return (
      <div className="newPostContainer">
        <form onSubmit={this.handleSubmit}>
          <div className="newPostRow">
            <div className="newPostItem">
              <label className="newPostLabel">Title:</label>
              <input className="newPostTitle" type="text" value={this.state.title} name="title" onChange={this.handleChange} />
            </div>

            <div className="newPostItem">
              <label className="newPostLabel">Date of event:</label>
              <input className="newPostDate" type="date" name="date" onChange={this.handleChange} />
            </div>

            <div className="newPostItem">
              <label className="newPostLabel">Tag:</label>
              <select className="newPostTag" type="select" name="tag" onChange={this.handleChange}>
                <option value="Traffic Stop">Traffic Stop</option>
                <option value="Emergency Response">Emergency Response</option>
                <option value="Noise Complaint">Noise Complaint</option>
                <option value="Domestic Dispute">Domestic Call</option>
              </select>
            </div>
          </div>


          <label className="newPostLabel">Post text:</label>
          <textarea className="newPostText" value={this.state.text} name="text" onChange={this.handleChange} />

          <div className="ratingRow">
            <div className="newPostItem">
              <label className="ratingLabel">Attitude:</label>
              <input className="ratingEntry" type="number" min="1" max="5" value={this.state.attitude} name="attitude" onChange={this.handleChange} />
            </div>
            <div className="newPostItem">
              <label className="ratingLabel">Communication:</label>
              <input className="ratingEntry" type="number" min="1" max="5" value={this.state.communication} name="communication" onChange={this.handleChange} />
            </div>
            <div className="newPostItem">
              <label className="ratingLabel">Efficiency:</label>
              <input className="ratingEntry" type="number" min="1" max="5" value={this.state.efficiency} name="efficiency" onChange={this.handleChange} />
            </div>
          </div>

          <div className="ratingRow">
            <div className="newPostItem">
              <label className="ratingLabel">Fairness:</label>
              <input className="ratingEntry" type="number" min="1" max="5" value={this.state.fairness} name="fairness" onChange={this.handleChange} />
            </div>
            <div className="newPostItem">
              <label className="ratingLabel">Safety:</label>
              <input className="ratingEntry" type="number" min="1" max="5" value={this.state.safety} name="safety" onChange={this.handleChange} />
            </div>
          </div>

          <div className="newPostControls">
            <button className="cancelPost" onClick={this.props.cancelPost}>Cancel</button>
            <input className="submitPost" type="submit" value="Post" />
          </div>
        </form>
      </div>
    );
  }
}

// Displays the ratings for each post. Hidden by default until "Show Ratings" is clicked.
class PostRatings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholderRating: 2.4
    }
  }
  // Pass the ratings down as props through the post component

  // Consists of two sections, each containing three ratings
  render() {
    return (
      <div className="postRatingsBody">
        <div className="postRatingContainer">
          <p className="rating">Attitude: <span className="ratingNumber">{this.props.attitude}</span></p>
          <p className="rating">Communication: <span className="ratingNumber">{this.props.communication}</span></p>
          <p className="rating">Efficiency: <span className="ratingNumber">{this.props.efficiency}</span></p>
        </div>
        <div className="postRatingContainer">
          <p className="rating">Fairness: <span className="ratingNumber">{this.props.fairness}</span></p>
          <p className="rating">Safety: <span className="ratingNumber">{this.props.safety}</span></p>
          <p className="rating">Overall: <span className="ratingNumber">{this.props.overall}</span></p>
        </div>
      </div>
    );
  }
}

// Each user post to be rendered in DepartmentPage
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
      repliesVisible: false,
      replies: []
    }

    this.toggleRatings = this.toggleRatings.bind(this);
    this.toggleReplies = this.toggleReplies.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  /* I think this is unnecessary. You should be able to grab the props directly in render()
      Ideally state will only be used for the mutable aspects of the component, like the visibility booleans
  */
  componentDidMount() {
    this.setState({user: this.props.user});
    this.setState({date: this.props.date});
    this.setState({title: this.props.title});
    this.setState({text: this.props.text});

    axios.get(`${baseUrl}/department/${this.props.department_id}/post/${this.props.id}/replies`).then(res=>{
      this.setState({replies: res.data.replies});
    });
  }

  // Controls whether the ratings for the post are visible.
  toggleRatings() {
    var current = this.state.ratingsVisible;

    this.setState({
      ratingsVisible: !current
    });
  }

  // Controls whether the replies for the post are visible.
  toggleReplies() {
    var current = this.state.repliesVisible;
    //TODO: Fetch replies
    this.setState({
      repliesVisible: !current
    });
  }

  handleDelete() {
    alert("DELTING POST");
  }

  // Consists of a header with post information, a body, a ratings section, and replies.
  // PostRatings and ReplyFeed are conditionally rendered based on the state of ratingsVisible
  // and repliesVisible respectively.
  render() {
    return (
      // CONDITIONAL RENDERING: ONLY RENDER DELETE POST BUTTON IF USER IS LOGGED IN
      <div className="postBox">

        <div className="postInfo">
            <span className="postTitle">{this.state.title}</span> on {this.state.date} by&nbsp;
            <a className="userName">{this.state.user}</a>
            <span className="postTag">{this.state.tag}</span>
        </div>

        <p className="postBody">
          {this.state.text}
        </p>

        {this.state.ratingsVisible && (<PostRatings attitude={this.props.attitude} communication={this.props.communication}
        efficiency={this.props.efficiency} fairness={this.props.fairness} safety={this.props.safety} overall={this.props.overall}/>)}
        {this.state.repliesVisible && (<ReplyFeed replies={this.state.replies} postid={this.props.id} department_id={this.props.department_id}/>)}

        <div className="postControls">
          <p className="toggleRatings" onClick={this.toggleRatings}>
            {this.state.ratingsVisible ? "Hide Ratings" : "Show Ratings"}
          </p>
          <p className="toggleReplies" onClick={this.toggleReplies}>
            {this.state.repliesVisible ? "Hide Replies" : "Show Replies"}
          </p>

          {true && (
            <p className="deleteButton" onClick={this.handleDelete}>
              Delete Post
            </p>
          )}
        </div>

      </div>
    );
  }
}

class PostFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      creatingPost: false,
      posts: []
    }

    this.showNewPost = this.showNewPost.bind(this);
    this.cancelPost = this.cancelPost.bind(this);
  }

  // Call API after component is mounted. Updates state, which triggers rerender with retrieved posts
  componentDidMount() {
    axios.get(`${baseUrl}/department/${this.props.id}/post/all`)
      .then(res => {
        const data = res.data.department_posts;
        console.log("PostFeed Mount");
        console.log(data);
        this.setState({ posts: data });
      });
  }

  // Show NewPost form
  showNewPost() {
    this.setState({
      creatingPost: true
    });
  }

  // Hide NewPost form
  cancelPost() {
    this.setState({
      creatingPost: false
    });
  }

  // Consists of PostControls header, the NewPost form, and any rendered posts
  render() {
    const { posts } = this.state;
    return (
      // Parent of NewPost

      // CONDITIONAL RENDERING: ONLY RENDER PostControls IF THE USER IS LOGGED IN
      <div className="postFeedContainer">

        {true && (
          <PostControls showNewPost={this.showNewPost} isHomepage={this.props.isHomepage} />
        )}

        {this.state.creatingPost && (<NewPost cancelPost={this.cancelPost} department_id={this.props.id}/>)}
        {posts.map(post => (
          <Post title={post.title} date={post.created_at.substring(0, post.created_at.indexOf('T'))} 
          user={post.user_id} text={post.body} id={post.id} department_id={this.props.id}
          attitude={post.attitude} communication={post.communication} efficiency={post.efficiency} fairness={post.fairness} safety={post.safety}/>
        ))}
        <Post />
        <Post />
      </div>
    );
  }
}

export default PostFeed;
