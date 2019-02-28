import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addUser} from '../actions/userActions'

export class SignupComponent extends Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addThisUser(this.state)
    this.props.history.push("/profile")
  }

  render(){
    return (
      <div className="start-screen-container">
        <div id="logo-left"><h1>BINGO</h1></div><div id="logo-right"><h1>BANGO</h1></div>
        <h3>Sign Up</h3>
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            placeholder="Enter Your New Username"
            onChange={this.handleChange}
            minLength="4"
            maxLength="12"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            placeholder="Enter Your New Password"
            onChange={this.handleChange}
            minLength="4"
            maxLength="12"
            required
          />
          <br />
          <button type="submit" id="submit">Sign Up</button>
        </form>
        <div className="go-back-container">
          ...or <a href="/"><u>Go Back</u></a>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return { addThisUser: user => dispatch(addUser(user))}
}

export default connect(null, mapDispatchToProps)(SignupComponent)
