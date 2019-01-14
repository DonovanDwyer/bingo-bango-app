import React, {Component} from 'react';
import {connect} from 'react-redux';
import {activateValue} from '../actions/bingoActions'
import socketIO from 'socket.io-client'

// const BASEURL = "http://localhost:9001"
// const BASEURL = ":9001"
const BASEURL = "https://cbd0bac4.ngrok.io"

class CPUSocketContainer extends Component {

  constructor(props){
    super(props)
    this.io = socketIO()
    this.state = {
      current: null
    }
  }

  componentDidMount = () => {
    let timer;
    this.io.emit('check_cpu_status', this.props.roomName)
    this.io.on('give_cpu_status', (data) => {
      if(!data){
        timer = setInterval(this.runTheMachine, 3000)
        this.io.emit('cpu_running', this.props.roomName)
      }
    })
    this.io.on('winner', function(){
      clearInterval(timer)
      this.io.emit('cpu_dying', this.props.roomName)
    })
  }

  componentWillUnmount = () => {
    this.io.removeAllListeners()
  }

  selectValue = () => {
    return Math.floor(Math.random() * 30);
  };

  checkValue = (value) => {
    return !this.props.activeValues.find(box => box === value)
  };

  displayValue = () => {
    return this.current
  };

  setValue = (value) => {
    this.io.emit('add', {value: value, room: this.props.roomName})
  }

  runTheMachine = () => {
    let value = this.selectValue();
    if(this.checkValue(value)){
      this.setValue(value)
    } else {
      this.runTheMachine()
    }
  }


  render(){
    return (
      <div>
      </div>
    )
  };

};

const mapStateToProps = state => {
  return {
    selectedBoxes: state.selectedBoxes
   }
}

const mapDispatchToProps = dispatch => {
  return {
    activate: value => dispatch(activateValue(value))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CPUSocketContainer)
