import React, {Component} from 'react';
import BingoCard from './BingoCard';
import {connect} from 'react-redux';
import {increaseWins, increaseLosses} from '../actions/userActions'
import {valueGetter} from '../actions/bangoActions'
import {CSSTransition} from 'react-transition-group'


class BangoGameComponent extends Component {

  constructor(props){
    super(props)
    this.activeValues = []
    this.winner = ""
    this.state = {
      currentVal: null,
      winner: false,
      countdown: true
    }
  }

  componentDidMount = () => {
    this.props.io.on('receive_values', (values) => {
      if(values !== null){
      console.log(values)
      let arrayOfValues = []
      for(let value of values){
        arrayOfValues.push(value.content)
      }
      this.setState({values: arrayOfValues})
    }
    })
    this.props.io.once('winner', (user) => {
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
    this.props.io.on("new_bango_value", (data) => {
        this.setState({
          currentVal: data[data.length - 1]
        })
    })
    if(!this.state.values){
      this.props.io.emit('get_current_game_values', {room: this.props.roomName})
    }
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  render(){
    let finalDiv;
    if(this.state.winner){
      finalDiv = <div className="game-win-screen">
        <h1>{this.state.winner}</h1>
        <button onClick={() => this.props.reset()}>Go to Profile</button>
      </div>
    } else {
      finalDiv = <div>
        <div className="game-name-container">
        <div className="game-name-letter-box-bango">B</div>
        <div className="game-name-letter-box-bango">A</div>
        <div className="game-name-letter-box-bango">N</div>
        <div className="game-name-letter-box-bango">G</div>
        <div className="game-name-letter-box-bango">O</div>
        </div>
        {this.state.values &&
          <BingoCard user={this.props.currentUser} values={this.shuffleArray(this.state.values)} socket={this.props.io} roomName={this.props.roomName} />}
          <CSSTransition
            key={this.state.currentVal}
            timeout={500}
            classNames="val"
          >
            {this.state.currentVal ? <div className="current-value"><h2>Current value: {this.state.currentVal}</h2></div> : <div></div>}
          </CSSTransition>
      </div>
    }

    return (
      <div>
        {finalDiv}
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getValues: (theme) => dispatch(valueGetter(theme)),
    logWin: (user) => dispatch(increaseWins(user)),
    logLoss: (user) => dispatch(increaseLosses(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BangoGameComponent);
