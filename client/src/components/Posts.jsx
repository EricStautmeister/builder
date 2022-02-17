import React, { Component } from 'react';
import { Link } from "react-router-dom";

//Adjust css

export default class Posts extends Component {
  render() {
    return (
      <div>
        <Link to="/blog/this-is-a-post-title">
          <h1 className="font-weight-light">This is a post title</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s, when an unknown printer took a galley
            of type and scrambled it to make a type specimen book.
          </p>
        </Link>
      </div>
    );
  }
}