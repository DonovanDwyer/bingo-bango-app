import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getUser} from '../actions/userActions'

class LoginComponent extends Component {

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
    this.props.getThisUser(this.state)
    this.props.history.push("/profile")
  }

  render(){
    return (
      <div>
        <h3>Log In</h3>
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="Enter Username"
            onChange={this.handleChange}
          />
          <br />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Enter Password"
            onChange={this.handleChange}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return { getThisUser: user => dispatch(getUser(user))}
}

export default connect(null, mapDispatchToProps)(LoginComponent)
