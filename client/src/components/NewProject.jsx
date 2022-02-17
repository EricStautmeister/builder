import React, { Component } from 'react';

import './css/Blog.css'; //Adjust css

export default class NewProject extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            content: '',
            postId: null,
        };
    }

    handleTitle = (event) => {
        this.setState({
            title: event.target.value,
        });
    };

    handleContent = (event) => {
        this.setState({
            content: event.target.value,
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
        this.postReq('/uploadProject', {
            title: this.state.title.toString(),
            content: this.state.content.toString(),
        }).then((data) => {
            console.log(data);
        });
    };

    render() {
        //TODO: Input IDs have to be changed, here and in Blog.jsx
        //TODO: Add text modifiers, maybe a markdown plugin or so
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
                        value={this.state.content}
                        onChange={this.handleContent}
                        placeholder="Type Entry Here"
                    />
                    <input type="submit" value="Submit" className="btn" />
                </form>
            </div>
        );
    }
}
