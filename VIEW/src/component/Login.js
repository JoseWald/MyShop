import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import userPNG from "../IMG/user.png";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameMessage: '',
            password: '',
            passwordMessage: '',
            errorMessage: ''
        };
        this.handleUserName = this.handleUserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserName(event) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/auth/login', {
                username: this.state.username,
                password: this.state.password
            });
            localStorage.setItem('token', res.data.token);
            this.fetchProtectedData();
            console.log('connected token='+res.data.token);
        } catch (err) {
            console.error(err.response?.data.message);
            this.setState({ passwordMessage: 'error', errorMessage: err.response?.data.message || 'An error occurred' });
        }
    }

    async fetchProtectedData() {
        let token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:8000/auth/protecteddata', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('token saved::' + res.data);
        } catch (err) {
            console.error(err.response?.data.message);
            this.setState({ passwordMessage: 'error', errorMessage: err.response?.data.message || 'An error occurred' });
        }
    }

    render() {
        const { usernameMessage, passwordMessage, errorMessage } = this.state;
        return (
            <div>
                <div className="row p-2 rounded my-5 mx-auto col-11 col-md-8 shadow">
                    <div className="p-4 my-3 mx-auto col-md-6">
                        <h1 className="text-primary text-center">Sign in to your account</h1>
                        <div className="text-center">
                            <img src={userPNG} alt="userPNG" className="mx-auto w-75 my-3" />
                        </div>
                    </div>
                    <div className="form-signup p-4 my-5 mx-auto col-md-6">
                        <form className="p-4" onSubmit={this.handleSubmit}>
                            <div className="my-2">
                                <label htmlFor="username" className="form-label">Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={this.state.username}
                                    onChange={this.handleUserName}
                                    required
                                />
                                {usernameMessage && <div className="text-danger">{usernameMessage}</div>}
                            </div>
                            <div className="my-2">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={this.state.password}
                                    onChange={this.handlePassword}
                                    required
                                />
                                {passwordMessage && <div className="text-danger">{passwordMessage}</div>}
                            </div>
                            {errorMessage && <div className="text-danger">{errorMessage}</div>}
                            <button type="submit" className="btn btn-primary w-100 my-3 p-2 shadow">Login</button>
                            <Link to="/Signup">
                                <button type="button" className="btn y text-primary w-100 mt-4 p-2 shadow" id="signup">Signup</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
