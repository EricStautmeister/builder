import React, { Component } from 'react'; //useEffect, useState

import './css/Login.css';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            password: '',
        };
    }

    handleUser = (event) => {
        this.setState({
            user: event.target.value,
        });
        console.log(event.target.value);
    };

    handlePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
        console.log(event.target.value);
    };

    handleSubmit = (event) => {
        alert(`Server: ${this.state.user}`);
        event.preventDefault();
    };

    render() {
        return (
            <div id="Anchor">
                <form
                    id="loginForm"
                    className="form"
                    onSubmit={this.handleSubmit}>
                    <input
                        id="itemTitle"
                        type="text"
                        value={this.state.user}
                        onChange={this.handleUser}
                        placeholder="@user"
                    />
                    <input
                        id="itemContent"
                        className="input"
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePassword}
                        placeholder="********"
                    />
                    <input type="submit" value="Submit" className="btn" />
                </form>
            </div>
        );
    }
}
