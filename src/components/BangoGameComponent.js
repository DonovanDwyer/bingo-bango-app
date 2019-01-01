import React, {Component} from 'react';
import BingoCard from './BingoCard';
import {connect} from 'react-redux';
import {increaseWins, increaseLosses} from '../actions/userActions'
import {valueGetter} from '../actions/bangoActions'


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

  runCountdown = () => {
    setTimeout(() => this.setState({countdown: false}), 1000)
    return <div><h1>Bango game will begin in 1 second(s)</h1></div>
  }

  render(){
    let finalDiv;
    if(this.state.winner){
      finalDiv = <div>
        <h1>{this.state.winner}</h1>
        <button onClick={() => this.props.reset()}>Go to Profile</button>
      </div>
    } else if(this.state.countdown === true){
      finalDiv = this.runCountdown()
    } else {
      finalDiv = <div>
        <div className="current-value-container">
          <h2>Current value: {this.state.currentVal}</h2>
        </div>
        <h1>BANGO</h1>
        {this.state.values &&
          <BingoCard user={this.props.currentUser} values={this.shuffleArray(this.state.values)} socket={this.props.io} roomName={this.props.roomName} />}
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
