import React from 'react';
import Post from './Post.js';
import baseUrl from '../Utils/config'
import axios from 'axios';
import './DepartmentPage.css';
import './NewPost.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
      //TODO: Need to find a way for login to be derived from register
    }

    this.search = this.search.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  search(event) {
    alert("Search");
  }

  signIn(event) {
    alert("Sign In");
  }

  signOut(event) {
    alert("Sign Out");
  }

  render() {
    const loggedIn = this.state.loggedIn;
    let accountControl;
    if (loggedIn) {
      accountControl = <a className="signOutButton" onClick={this.signOut}>Sign Out</a>;
    } else {
      accountControl = <a className="signInButton" onClick={this.signIn}>Sign In</a>;
    }

    return (
      <div className="headerBody">
        <p className="logo">BlueView</p>
        <a className="search" onClick={this.search}>Search</a>
        {accountControl}
      </div>
    );
  }
}

class DepartmentRatings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {    // REPLACE WITH PROPS WHEN IMPLEMENTED
      testnumber: 4.3
    }
  }

  render() {
    return (
      <div className="ratingsContainer">
        <p className="rating">Attitude: <span className="ratingNumber">{this.state.testnumber}</span></p>
        <p className="rating">Communication: <span className="ratingNumber">{this.state.testnumber}</span></p>
        <p className="rating">Efficiency: <span className="ratingNumber">{this.state.testnumber}</span></p>
        <p className="rating">Fairness: <span className="ratingNumber">{this.state.testnumber}</span></p>
        <p className="rating">Safety: <span className="ratingNumber">{this.state.testnumber}</span></p>
        <p className="rating">Overall: <span className="ratingNumber">{this.state.testnumber}</span></p>
      </div>
    );
  }
}

class DepartmentHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: "dummy",name: "South Glens Falls Police Department", address:"5 W Marion Ave, South Glens Falls, NY", zipcode: "", overall_rating:""};
    
  }
  
  
  componentDidMount() {
    axios.get(`${baseUrl}/department/${this.props.id}`)
      .then(res => {
        const data = res.data.department[0]
        console.log(data);
        this.setState({id: this.props.id});
        this.setState({name: data.name});
        this.setState({address: data.address});
        // return {id: this.props.id, name: data.name, address: data.address};
      })
  }

  render() {
    return (
      <div className="departmentHeaderMain">
        <div className="centerBox">
          <div className="nameAddress">
            <h1 className="departmentName">{this.state.name}</h1>
            <h2 className="departmentAddress">{this.state.address}</h2>
          </div>
          {/* <h3 className="id">{this.state.id}</h3> */}
          <DepartmentRatings />
        </div>
      </div>
    );
  }
}

class PostControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="postControlsContainer">
        <button className="createNewPostButton" onClick={this.props.showNewPost}>
          New Post
        </button>
      </div>
    );
  }
}

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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Title: " + this.state.title +
          "\nDate: " + this.state.date +
          "\nText: " + this.state.text);
    // TODO: Handle submit of post
    //axios.post(`${baseUrl}/account/post`, {
    //}
    this.props.cancelPost(); // Hide new post form
  }

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

  componentDidMount() {
    axios.get(`${baseUrl}/department/${this.props.id}/post/all`)
      .then(res => {
        const data = res.data.department_posts;
        console.log("PostFeed Mount");
        console.log(data);
        this.setState({posts: data});
      });
  }

  showNewPost() {
    this.setState({
      creatingPost: true
    });
  }

  cancelPost() {
    this.setState({
      creatingPost: false
    });
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="postFeedContainer">
        <PostControls showNewPost={this.showNewPost} />
        {this.state.creatingPost && (<NewPost cancelPost={this.cancelPost} />)}
        {posts.map(post => (
          <Post title={post.title} date={post.date} 
          user={post.user} text={post.text}  />
        ))}
      </div>
    );
  }
}

class DepartmentContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="departmentContentMain">
        <div className="centerBox">
          <PostFeed id= {this.props.id}/>
        </div>
      </div>
    );
  }
}

class DepartmentPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="departmentPageMain">
        <Header />
        <DepartmentHeader id= {this.props.match.params.id} />
        <DepartmentContent id= {this.props.match.params.id} />
      </div>
    );
  }
}

export default DepartmentPage;
