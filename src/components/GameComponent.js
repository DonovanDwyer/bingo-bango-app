import React, {Component} from 'react';
import BingoCard from './BingoCard';
import {connect} from 'react-redux';

class GameComponent extends Component {

  // 1. Fetch values from DB
  // 2. Apply a selection of 25 random values to Bingo Card component

  bingoValues = () => {
    let array = [];
    for (let i = 1; i <= 30; i++){
      array.push(i);
    }
    return array;
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  render(){
    return (
      <div>
        <BingoCard user={this.props.currentUser} values={this.shuffleArray(this.bingoValues())} />
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(GameComponent);
