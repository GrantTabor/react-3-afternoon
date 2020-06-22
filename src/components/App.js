import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then( results => {
      this.setState({ posts: results.data });
    })
    .catch(error => {alert("failed to download!")});
  }

  updatePost( id, text ) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text })
    .then( results => {
      this.setState({ posts: results.data });
    })
    .catch(error => {alert("failed to update!")});
    
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(results => {
      this.setState({posts: results.data})
    })
    .catch(error => {alert("failed to delete")})
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text})
    .then(results => {
      this.setState({posts: results.data})
    })
    .catch(error => {alert("failed to add")})
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        
        <Header posts={posts}/>

        <section className="App__content">

          <Compose createPost={ this.createPost }/>
          
          {
            posts.map( post => (
              <Post key={ post.id }
                    text={ post.text}
                    date={ post.date }
                    id={ post.id }
                    updatePostFn={ this.updatePost }
                    deletePostFn={ this.deletePost }
                     />
            ))
          }

        </section>
      </div>
    );
  }
}

export default App;