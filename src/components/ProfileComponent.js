import React, {Component} from 'react';
import {connect} from 'react-redux';



class ProfileComponent extends Component {

  startGame = () => {
    this.props.history.push('/game')
  }

  render(){
    const {currentUser} = this.props;
    return (
      <div>
        Username: {currentUser.username}
        <br />
        Wins: {currentUser.wins}
        <br />
        Losses: {currentUser.losses}
        <br />
        <button onClick={this.startGame}>Start New Game</button>
      </div>
    )
  }

};

const mapStateToProps = state => {
  return { currentUser: state.currentUser }
};

export default connect(mapStateToProps)(ProfileComponent);
