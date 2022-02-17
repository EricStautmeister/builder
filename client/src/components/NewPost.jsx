import React, { Component } from 'react';

import './css/Blog.css'; //Adjust css

export default class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            text: '',
            postId: null,
        };
    }

    handleTitle = (event) => {
        this.setState({
            title: event.target.value,
        });
    };

    handleText = (event) => {
        this.setState({
            text: event.target.value,
        });
    };

    postReq = async (httpAnchor, data) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                mode: 'cors',
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(
            `http://localhost:5000${httpAnchor}`,
            requestOptions
        );
        return response.json();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.postReq('/uploadPost', {
            title: this.state.title,
            text: this.state.text,
        }).then((data) => {
            console.log(data);
        });
    };

    render() {
        return (
            <div id="Anchor">
                <form id="loginForm" onSubmit={this.handleSubmit}>
                    <input
                        id="blogTitle"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleTitle}
                        placeholder="Title"
                    />
                    <textarea
                        id="blogText"
                        type="text"
                        value={this.state.text}
                        onChange={this.handleText}
                        placeholder="Type Entry Here"
                    />
                    <input type="submit" value="Submit" className="btn" />
                </form>
            </div>
        );
    }
}
