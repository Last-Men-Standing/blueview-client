import React from 'react';
import Post from './Post.js';
import './DepartmentPage.css';

class DepartmentHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="departmentHeaderMain">
        <div className="widthBox">
          <h1 className="departmentName">Local Police Department</h1>
          <h2 className="departmentAddress">123 Address Street - Troy, NY</h2>
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
        <button onClick={this.props.startNewPost}>
          New Post
        </button>
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

    this.startNewPost = this.startNewPost.bind(this);
  }

  startNewPost() {
    alert("yo");
  }

  render() {
    //{this.state.creatingPost && (<NewPost />)}
    return (
      <div>
        <PostControls startNewPost={this.startNewPost} />
        
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
        <div className="widthBox">
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
