import React, {Component} from 'react';
import {BingoBox} from './BingoBox'
import {activateValue} from '../actions/bingoActions'
import {connect} from 'react-redux'
import {CheckForWin} from './CheckForWin'

export class BingoCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      bingoCard: {
        "b1": "", "i1": "", "n1": "", "g1": "", "o1": "",
        "b2": "", "i2": "", "n2": "", "g2": "", "o2": "",
        "b3": "", "i3": "", "n3": "", "g3": "", "o3": "",
        "b4": "", "i4": "", "n4": "", "g4": "", "o4": "",
        "b5": "", "i5": "", "n5": "", "g5": "", "o5": ""
      },
      activeValues: []
    }
  }

  componentDidMount = () => {
    let i = 0;
    let bingoMap = {...this.state.bingoCard}
    for(let box in bingoMap){
      bingoMap[box] = this.props.values[i]
      i++;
    }
    this.setState({
      bingoCard: bingoMap
    })
    this.props.socket.on("new", (data, values) => {
      if (!this.state.activeValues.find(val => val === data)){
        this.setState({
          activeValues: values
        })
      }
      console.log(this.state.activeValues)
    })
    this.props.socket.on("new_bango_value", (data) => {
        this.setState({
          activeValues: data
        })
      console.log(this.state.activeValues)
    })
    this.props.socket.once("winner", (user) => {
      this.setState({
        activeValues: []
      })
    })
  }

  componentDidUpdate = () => {
    if(CheckForWin(this.state.bingoCard, this.state.activeValues)){
      this.props.socket.emit('victory', {user: this.props.user, room: this.props.roomName})
    }
  }

  activate = value => {
    if (this.props.bingo){

    } else if(!this.state.activeValues.find(val => val === value)){
      this.props.socket.emit('add_bango_value', {value: value, room: this.props.roomName})
    }
  }

  render() {
    let arrayOfBoxes = [];
    for(let box in this.state.bingoCard){
      arrayOfBoxes.push(<BingoBox
        key={box}
        id={box}
        active={!!this.state.activeValues.find(x => x === this.state.bingoCard[box]) ? "bingo-box activated" : "bingo-box"}
        value={this.state.bingoCard[box]}
        clickHandler={this.activate}
      />)
    }

    return (
      <div className="bingo-field">
        {arrayOfBoxes}
      </div>
    )
  }
};

const mapStateToProps = state => {
  return { selectedBoxes: state.selectedBoxes,
    currentUser: state.currentUser }
}


const mapDispatchToProps = dispatch => {
  return {
    activate: (value) => dispatch(activateValue(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BingoCard);
