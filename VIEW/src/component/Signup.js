import React, { Component } from "react";
import { Link } from "react-router-dom";
import add_user_png from "../IMG/add-user.png";

class Signup extends Component {
      constructor(props) {
        super(props);
        this.state = {
          username: '',
          usernameErrMessage: '',
          password: '',
          passwordErrMessage: '',
          passwordConfirmation: '',
          passwordConfirmationErrMessage: '',
          successMessage:''
        };

        this.handleUserName = this.handleUserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordConfirmation = this.handlePasswordConfirmation.bind(this);
        this.handleSubmition = this.handleSubmition.bind(this);
      }

      handleUserName(event) {
        this.setState({ username: event.target.value });
      }

      handlePassword(event) {
        this.setState({ password: event.target.value });
      }

      handlePasswordConfirmation(event) {
        this.setState({ passwordConfirmation: event.target.value });
      }

      handleSubmition(event) {
            event.preventDefault(); 

            const { username, password, passwordConfirmation } = this.state;
            const passwordRegex = /[a-zA-Z1-9]/;

            let valid = true;

            if (username.length < 3) {
              this.setState({ usernameErrMessage: 'Username too short' });
              valid = false;
            } else {
              this.setState({ usernameErrMessage: '' });
            }

            if (!passwordRegex.test(password) || password.length<8) {
              this.setState({ passwordErrMessage: 'Must have at least 8 characters, 1 digit, 1 uppercase and 1 lowercase letter' });
              valid = false;
            } else {
              this.setState({ passwordErrMessage: '' });
            }

            if (passwordConfirmation !== password) {
              this.setState({ passwordConfirmationErrMessage: 'Does not match the password' });
              valid = false;
            } else {
              this.setState({ passwordConfirmationErrMessage: '' });
            }

            if (valid) {
              this.setState({successMessage:'account created successfully , now go to the login page '})
            }
      }

      render() {
        const { usernameErrMessage, passwordErrMessage, passwordConfirmationErrMessage , successMessage } = this.state;
            return (
                  <div className="bg-light">
                    <div className="row p-2 rounded my-5 mx-auto col-11 col-md-8 shadow">
                      <div className="p-4 my-3 mx-auto col-md-6">
                        <h1 className="text-primary text-center">Create an account</h1>
                        <div className="text-center">
                          <img src={add_user_png} alt="" className="mx-auto w-75 my-3" />
                        </div>
                      </div>
                      <div className="form-signup p-4 my-3 mx-auto col-md-6">
                        <form className="p-4" onSubmit={this.handleSubmition}>
                          <div className="my-2">
                            <label htmlFor="name" className="form-label">Username:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              value={this.state.username}
                              onChange={this.handleUserName}
                              required
                            />
                            {usernameErrMessage && <div className="text-danger">{usernameErrMessage}</div>}
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
                            {passwordErrMessage && <div className="text-danger">{passwordErrMessage}</div>}
                          </div>

                          <div className="my-2">
                            <label htmlFor="confirmPassword" className="form-label">Confirm password:</label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirmPassword"
                              value={this.state.passwordConfirmation}
                              onChange={this.handlePasswordConfirmation}
                              required
                            />
                            {passwordConfirmationErrMessage && <div className="text-danger">{passwordConfirmationErrMessage}</div>}
                          </div>

                          <button type="submit" className="btn btn-primary w-100 my-3 p-2 shadow">Signup</button>
                          <p className="text-center">Already have an account? <Link to="/Login">Login</Link> </p>
                          { successMessage && <div className="text-success">{successMessage}</div>}
                        </form>
                      </div>
                    </div>
                  </div>
            );
          }
    }

export default Signup;
