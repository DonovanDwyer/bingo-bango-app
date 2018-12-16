import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addUser} from '../actions/userActions'

class SignupComponent extends Component {

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
      <div>
        <h3>Sign Up</h3>
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return { addThisUser: user => dispatch(addUser(user))}
}

export default connect(null, mapDispatchToProps)(SignupComponent)
