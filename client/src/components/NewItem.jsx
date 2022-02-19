import React, { Component, useEffect, useState } from 'react';

import './css/Blog.css'; //TODO: Adjust css

export default class NewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csrfToken: '',
            formTitle: '',
            formContent: '',
        };
    }

    getCSRFToken = async (httpAnchor) => {
        const serverUrl = 'http://localhost:5000';
        const requestOptions = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                mode: 'cors',
            },
            mode: 'cors',
            credentials: 'include',
        };
        const response = await fetch(
            `${serverUrl}${httpAnchor}`,
            requestOptions
        );
        const data = await response.json();
        this.setState({
            csrfToken: data.csrfToken,
        });
    };

    componentDidMount() {
        console.log(this.props)
        this.getCSRFToken('/process');
    }

    handleTitle = (event) => {
        this.setState({
            formTitle: event.target.value,
        });
    };

    handleContent = (event) => {
        this.setState({
            formContent: event.target.value,
        });
    };

    postReq = async (httpAnchor, data) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'xsrf-token': this.state.csrfToken,
                mode: 'cors',
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
        };
        const response = await fetch(
            `http://localhost:5000${httpAnchor}`,
            requestOptions
        );
        return await response.json();
    };
    //
    handleSubmit = (event) => {
        event.preventDefault();
        this.postReq(this.props.url, {
            title: this.state.formTitle,
            content: this.state.formContent,
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
                        value={this.state.formTitle}
                        onChange={this.handleTitle}
                        placeholder="Title"
                    />
                    <textarea
                        id="blogText"
                        type="text"
                        value={this.state.formContent}
                        onChange={this.handleContent}
                        placeholder="Type Entry Here"
                    />
                    <input type="submit" value="Submit" className="btn" />
                </form>
            </div>
        );
    }
}
