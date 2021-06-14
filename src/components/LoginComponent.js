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
    this.props.getThisUser(this.state).then((res) => {
      if(res.payload.message){
        localStorage.clear();
        this.props.history.push('/');
      }
    })
    this.props.history.push("/profile")
  }
  render(){
    return (
      <div className="start-screen-container">
      <div id="logo-left"><h1>BINGO</h1></div><div id="logo-right"><h1>BANGO</h1></div>
        <h3>Log In</h3>
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="Enter Your Username"
            onChange={this.handleChange}
            required
            minLength="4"
            maxLength="12"
          />
          <br />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Enter Your Password"
            onChange={this.handleChange}
            required
            minLength="4"
            maxLength="12"
          />
          <br />
          <button type="submit">Login</button>
        </form>
        <div className="go-back-container">
          ...or <a href="/"><u>Go Back</u></a>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return { getThisUser: user => dispatch(getUser(user))}
}
export default connect(null, mapDispatchToProps)(LoginComponent)
