import React, {Component} from 'react';
import BingoCard from './BingoCard';
import {connect} from 'react-redux';
import {increaseWins, increaseLosses} from '../actions/userActions'
import CPUSocketContainer from './CPUSocketContainer'
import {CSSTransition} from 'react-transition-group'


class BingoGameComponent extends Component {

  constructor(props){
    super(props)
    this.values = []
    this.activeValues = []
    this.winner = ""
    this.state = {
      currentNum: null,
      winner: false
    }
  }

  componentDidMount = () => {
    this.props.io.on('new', (data, values) => {
      this.activeValues = values;
      this.setState({currentNum: data})
    })
    this.props.io.on('winner', (user) => {
      if(this.props.currentUser !== undefined){
        if(this.props.currentUser.id === user.id){
          this.setState({
            winner: `You won! Congratulations, ${this.props.currentUser.username}!`
          })
          this.props.logWin(this.props.currentUser)
        } else {
          this.setState({
            winner: `You lost! The winner is ${user.username}. Try playing again!`
          })
          this.props.logLoss(this.props.currentUser)
        }
      }
    })
  }

  componentWillUnmount = () => {
    this.props.io.removeAllListeners()
  }

  testBingoValues = () => {
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
    const total = this.shuffleArray(this.testBingoValues())
    this.values = total
    return (
      <div>
      {this.state.winner ? (
        <div className="game-win-screen">
          <h1>{this.state.winner}</h1>
          <button onClick={this.props.reset}>Go to Profile</button>
        </div>
      ) : (
      <div>
        <CPUSocketContainer values={total} activeValues={this.activeValues} roomName={this.props.roomName} />
        <div className="game-name-container">
        <div className="game-name-letter-box-bingo">B</div>
        <div className="game-name-letter-box-bingo">I</div>
        <div className="game-name-letter-box-bingo">N</div>
        <div className="game-name-letter-box-bingo">G</div>
        <div className="game-name-letter-box-bingo">O</div>
        </div>
        <BingoCard socket={this.props.io} user={this.props.currentUser} values={this.values} roomName={this.props.roomName} bingo={() => true} />
        <CSSTransition
          key={this.state.currentNum}
          timeout={500}
          classNames="val"
        >
          {this.state.currentNum ? <div className="current-value"><h2>Current number: {this.state.currentNum}</h2></div> : <div></div>}
        </CSSTransition>
      </div>
      )}
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    winner: state.winner
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logWin: (user) => dispatch(increaseWins(user)),
    logLoss: (user) => dispatch(increaseLosses(user))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BingoGameComponent);
