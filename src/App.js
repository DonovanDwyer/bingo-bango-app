import React, { Component } from 'react';
import './App.css';
import Login from './components/LoginComponent';
import Signup from './components/SignupComponent';
import ProfileComponent from './components/ProfileComponent';
import GameComponent from './components/GameComponent';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {

  renderStartScreen = (routerProps) => {
    return (
      <div>
        <Login {...routerProps} />
        <br />
        <Signup {...routerProps}  />
      </div>
    );
  };

  render(){
    return (
      <Router>
        <React.Fragment>
          {this.props.winner !== "" ? <h1>YOU'RE WINNER(sic)</h1>:null}
          <Switch>
            <Route exact path="/" render={(routerProps) => this.renderStartScreen(routerProps)} />
            <Route exact path="/profile" component={ProfileComponent} />
            <Route exact path="/game" component={GameComponent} />
          </Switch>
        </React.Fragment>
      </Router>
    )
  }

};

const mapStateToProps = state => {
  return {currentUser: state.currentUser,
  winner: state.winner}
};

export default connect(mapStateToProps)(App);
