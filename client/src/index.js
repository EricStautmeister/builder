// @flow

import React, { Component } from 'react'; //useEffect, useState
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Outlet,
    NavLink,
    // useSearchParams,
} from 'react-router-dom';

import { Post, Posts, NewPost, NewProject, Card, FullPage } from './components';
import reportWebVitals from './reportWebVitals';

import './components/css/normalise.css';
import './components/css/index.css';
import './components/css/Blog.css';
import './components/css/Projects.css';
// import './components/css/Login.css';
import './components/css/Header.css';
import './components/css/Footer.css';

import facebookIcon from './components/media/facebook.png';
import twitterIcon from './components/media/twitter.png';
import instagramIcon from './components/media/instagram.png';
import githubIcon from './components/media/github.png';
import youtubeIcon from './components/media/youtube.png';
import LogoIcon from './components/media/logo.png';
import { ReactComponent as MenuIcon } from './components/media/menu.svg';

//TODO: Rename project to portfolio builder (comes with appropriate changes)
//TODO: needs theme color changer and shit

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLogedIn: false,
        };
    }

    guardClauseExample = () => {
        if (this.state.user == null) return;

        console.log('Legendary Guard Clause');
    };

    render() {
        return (
            <div id="Header">
                <div id="navWrapper">
                    <NavLink id="icon" className="icon" to="/">
                        <img src={LogoIcon} alt="" height={80} width={80} />
                    </NavLink>
                    <div id="navBar">
                        <NavLink className="button" to="/projects">
                            <button className="btn">Projects</button>
                        </NavLink>
                        <NavLink className="button" to="/blog">
                            <button className="btn">Blog</button>
                        </NavLink>
                    </div>
                </div>
                <div id="actionWrapper">
                    {/* <div id="loginWrapper">
                        <div id="isUser">
                            <NavLink className="button" to="/login">
                                <button className="btn">Login</button>
                            </NavLink>
                        </div>
                        <div id="signUp">
                            <NavLink className="button" to="/signup">
                                <button className="btn">Sign Up</button>
                            </NavLink>
                        </div>
                    </div> */}
                    <div id="menu">
                        <MenuIcon />
                    </div>
                </div>
            </div>
        );
    }
}
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'Login',
        };
    }

    render() {
        return (
            <div id="Footer">
                <div className="iconWrapper">
                    <a className="icon facebook" href="http://facebook.com">
                        <span>
                            <img src={facebookIcon} alt="" className="icon" />
                        </span>
                    </a>
                    <a className="icon twitter" href="http://twitter.com">
                        <span>
                            <img src={twitterIcon} alt="" className="icon" />
                        </span>
                    </a>
                    <a className="icon instagram" href="http://instagram.com">
                        <span>
                            <img src={instagramIcon} alt="" className="icon" />
                        </span>
                    </a>
                    <a
                        className="icon github"
                        href="http://github.com/EricStautmeister">
                        <span>
                            <img src={githubIcon} alt="" className="icon" />
                        </span>
                    </a>
                    <a className="icon youtube" href="http://youtube.com">
                        <span>
                            <img src={youtubeIcon} alt="" className="icon" />
                        </span>
                    </a>
                </div>
            </div>
        );
    }
}
class Home extends Component {
    render() {
        return (
            <div>
                <div id="Body">Home</div>
            </div>
        );
    }
}
class Projects extends Component {
    render() {
        //TODO: Add a delete and edit btn
        //TODO: Document crud only if you are admin
        return (
            <div id="Body">
                <div className="btnContainer">
                    <NavLink
                        className="no-deco"
                        to={`/projects/add`}>
                        <button className="btn right-align">Add</button>
                    </NavLink>
                </div>
                <Outlet />
            </div>
        );
    }
}

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: null,
        };
    }

    componentDidMount() {
        this.fetchPosts();
    }

    //TODO: Instead of localstorage, use session storage

    //TODO: Do not fetch if there is data in localstorage, only if data has been updated

    //TODO: Also, perhaps localstorage should be cleaned every now and then storage.clear(str) or .removeItem(str)

    fetchPosts = async () => {
        const res = await fetch('http://localhost:5000/getProjects');
        const data = await res.json();
        this.setState({
            projectList: data.response,
        });
    };

    storeDataToLocalStorage = (projectList) => {
        if (projectList !== null && projectList.length) {
            const { projectList } = this.state;
            let index = 0;
            for (const project of projectList) {
                const data = JSON.stringify(project);
                localStorage.setItem(`${index}`, data);
                index++;
            }
        }
    };

    render() {
        const { projectList } = this.state;
        this.storeDataToLocalStorage(projectList);
        console.dir(projectList); //FIXME: This runs twice per render, find out why and potentially fix it
        return (
            <div className="container">
                {projectList !== null && projectList.length ? (
                    <div className="wrapper">
                        {projectList.map((item, index) => {
                            return (
                                <Card
                                    key={index}
                                    to={index}
                                    data={JSON.stringify(item)}
                                    title={item.title}
                                    content={item.content}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="wrapper">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                )}
            </div>
        );
    }
}
class Blog extends Component {
    render() {
        return (
            <div id="Body">
                <div className="btnContainer">
                    <NavLink className="no-deco" to={`/blog/new`}>
                        <button className="btn right-align">Create new Post</button>
                    </NavLink>
                </div>
                <Outlet />
            </div>
        );
    }
}
class Login extends Component {
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
            <div id="Body">
                <form id="loginForm" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.user}
                        onChange={this.handleUser}
                        placeholder="@user"
                    />
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePassword}
                        placeholder="********"
                    />
                    <input type="submit" value="Submit" className="button" />
                </form>
            </div>
        );
    }
}
class SignUp extends Component {
    render() {
        return (
            <div>
                <div id="Body">Sign Up</div>
            </div>
        );
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />}>
                    <Route path="" element={<ProjectList />} />
                    <Route path="add" element={<NewProject />} />
                    <Route path=":id" element={<FullPage />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/blog" element={<Blog />}>
                    <Route path="" element={<Posts />} />
                    <Route path="new" element={<NewPost />} />
                    <Route path="i?postSlug" element={<Post />} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// reportWebVitals(Projects.storeDataToLocalStorage)
reportWebVitals(console.log)