import React from 'react';
import Post from './Post.js';
import './DepartmentPage.css';
import './NewPost.css';

class DepartmentHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="departmentHeaderMain">
        <div className="centerBox">
          <h1 className="departmentName">Washington County Sheriffs Office</h1>
          <h2 className="departmentAddress">399 Broadway, Fort Edward, NY</h2>
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
      <div className="postControlsMain">
        <button onClick={this.props.showNewPost}>
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
      text: ''
    }

    this.onType = this.onType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onType(event) {
    this.setState({
      text: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Text: " + this.state.text);
  }

  render() {
    return (
      <div className="newPostContainer">
        <form onSubmit={this.handleSubmit}>
          <label className="newPostLabel">Create a new post:</label>
          <textarea className="newPostText" value={this.state.text} onChange={this.onType} />
          <button className="cancelPost" onClick={this.props.cancelPost}>Cancel</button>
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
}

class PostContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      creatingPost: false
    }

    this.showNewPost = this.showNewPost.bind(this);
    this.cancelPost = this.cancelPost.bind(this);
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
    return (
      <div>
        <PostControls showNewPost={this.showNewPost} />
        {this.state.creatingPost && (<NewPost cancelPost={this.cancelPost} />)}
        <Post />
        <Post />
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
          <PostContainer />
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
        <DepartmentHeader />
        <DepartmentContent />
      </div>
    );
  }
}

export default DepartmentPage;
