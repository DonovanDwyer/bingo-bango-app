import React, { Component } from 'react';
import './App.css';
import Login from './components/LoginComponent';
import Signup from './components/SignupComponent';
import ProfileComponent from './components/ProfileComponent';
import BingoGameComponent from './components/BingoGameComponent';
import BangoGameComponent from './components/BangoGameComponent';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { checkAuth, getUserViaToken } from './actions/userActions';

const StartScreen = () => {
  return (
    <div className="start-screen-container">
      <div className="logo-container">
        <div id="logo-left" className="animate-logo-left"><h1>BINGO</h1></div>
        <div id="logo-right" className="animate-logo-right"><h1>BANGO</h1></div>
      </div>
      <div className="start-screen-buttons center-vertically">
        <button id="red"><Link to="/signup">Sign Up for a New Account</Link></button>
        <br/>
        <button id="blue"><Link to="/login">Log In to an Existing Account</Link></button>
      </div>
    </div>
  );
}

const GameOver = () => {
  return (
    <div>
      <h1>GAME OVER!</h1>
      <h2>We have a winner!</h2>
      <Link to="/profile">Go to Profile</Link>
    </div>
  );
}

class App extends Component {
  componentDidMount = () => {
    if(localStorage.token && !this.props.currentUser){
      this.props.getUserByToken(localStorage.token);
    };
  };
  render(){
    return (
      <div className="top-level-container">
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={ StartScreen } />
              <Route exact path="/login" render={(routerProps) => <Login {...routerProps} />}/>
              <Route exact path="/signup" render={(routerProps) => <Signup {...routerProps} />}/>
              <Route exact path="/profile" component={ ProfileComponent }/>
              <Route exact path="/bingo" component={ BingoGameComponent } />
              <Route exact path="/bango" component={ BangoGameComponent } />
              <Route exact path="/gameover" component={ GameOver } />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authorizeUser: (token) => dispatch(checkAuth(token)),
    getUserByToken: (token) => dispatch(getUserViaToken(token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
