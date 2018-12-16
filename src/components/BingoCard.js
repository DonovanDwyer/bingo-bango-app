import React, {Component} from 'react';
import {BingoBox} from './BingoBox'
import {activateValue} from '../actions/bingoActions'
import {connect} from 'react-redux'
import {CheckForWin} from './CheckForWin'

class BingoCard extends Component {

  state = {
    bingoCard: {
      "b1": "", "i1": "", "n1": "", "g1": "", "o1": "",
      "b2": "", "i2": "", "n2": "", "g2": "", "o2": "",
      "b3": "", "i3": "", "n3": "", "g3": "", "o3": "",
      "b4": "", "i4": "", "n4": "", "g4": "", "o4": "",
      "b5": "", "i5": "", "n5": "", "g5": "", "o5": ""
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
  }

  componentDidUpdate = () => {
    if(CheckForWin(this.state.bingoCard, this.props.selectedBoxes)){
      this.props.declareWinner(this.props.user)
    }
  }

  render() {
    let arrayOfBoxes = [];
    for(let box in this.state.bingoCard){
      arrayOfBoxes.push(<BingoBox
        key={box}
        id={box}
        active={!!this.props.selectedBoxes.find(x => x === this.state.bingoCard[box]) ? "bingo-box activated" : "bingo-box"}
        value={this.state.bingoCard[box]}
        clickHandler={this.props.activate}
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
    activate: (value) => dispatch(activateValue(value)),
    declareWinner: (user) => dispatch({type: 'DECLARE_WINNER', payload: user})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BingoCard);
