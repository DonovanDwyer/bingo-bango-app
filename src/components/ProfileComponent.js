import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logUserOut, checkAuth} from '../actions/userActions'
import {valueGetter} from '../actions/bangoActions'
import socketIO from 'socket.io-client'
import BangoGameComponent from './BangoGameComponent'
import BingoGameComponent from './BingoGameComponent'
import Editor from './EditComponent'

// const BASEURL = "http://localhost:9001"
// const BASEURL = "http://bingobango-frontend.herokuapp.com:9001"
// const BASEURL = "https://cbd0bac4.ngrok.io"

class ProfileComponent extends Component {

  constructor(props){
    super(props)
    this.io = socketIO()
    this.state = {
      theme: "",
      roomName: "",
      gameChosen: false,
      roomList: [],
      editMode: false
    }
  }

  componentDidMount = () => {
    setTimeout( () => {
      return this.props.authorizeUser(localStorage.getItem('token')).then(json => {
        if(json.message === "Please Log In"){
          localStorage.clear();
          this.props.history.push('/');
        }
      })
    }, 500)
  }

  componentWillUnmount = () => {
    this.io.removeAllListeners()
  }

  resetProfileScreen = () => {
    this.io.removeAllListeners();
    this.setState({
      theme: "",
      gameChosen: false,
      roomList: [],
      roomName: ""
    })
  }

  startBingoGame = e => {
    let name;
    e.preventDefault();
    this.state.roomName === "" ? name = `${this.props.currentUser.username}'s Room` : name = this.state.roomName
    this.io.emit("new_game_room", {name: name, type: "bingo"})
    this.setState({
      roomName: name,
      gameChosen: "bingo"
    })
  }
  startBangoGame = e => {
    this.io.removeAllListeners()
    e.preventDefault();
    this.io.emit("set_theme", this.state.theme)
    this.io.emit('get_theme', {})
    let name;
    this.state.roomName === "" ? name = `${this.props.currentUser.username}'s Room` : name = this.state.roomName
    this.io.once('receive_theme', (theme) => {
      this.props.getValues({theme: theme, room: name})
    })
    this.io.emit("new_game_room", {name: name, type: "bango"})
    this.setState({
      roomName: name,
      gameChosen: "bango"
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleButton = () => {
    this.setState({
      theme: "Dinner With The Family"
    })
  }

  handleLogOut = () => {
    localStorage.clear()
    this.props.logOut()
    this.props.history.push('/')
  }

  showRooms = () => {
    this.io.emit("get_rooms", {})
    this.io.on('receive_rooms', rooms => {
      this.setState({roomList: rooms})
    })
  }

  joinRoom = e => {
    e.preventDefault();
    if(this.state.roomName === ""){
      this.io.emit('join_room', this.state.roomList[0].name)
      this.setState({
        roomName: this.state.roomList[0].name,
        gameChosen: this.state.roomList[0].type
      })
    } else {
    this.io.emit('join_room', this.state.roomName)
    let room = this.state.roomList.find(rm => rm.name === this.state.roomName)
    this.setState({gameChosen: room.type})
    }
  }

  renderRoomList = () => {
    let arrayOfRooms = this.state.roomList.map(room => <option value={room.name} key={room.name}>{room.name} - {room.type} Game</option>)
    return <form onSubmit={this.joinRoom} className="room-form-container center-vertically">
      <label>
      Select a room:<br/>
      <select name="roomName" onChange={this.handleChange}>
        {arrayOfRooms}
      </select>
      </label>
      <input type="submit" />
    </form>
  }

  renderBangoMenu = () => {
    return (
      <div className="center-vertically">
      <form onSubmit={this.startBangoGame} className="room-form-container">
        <label>
          Game Room Name:
          <input
            type="text"
            name="roomName"
            placeholder={`${this.props.currentUser.username}'s Room`}
            value={this.state.roomName}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
        Select your Bango theme:<br/>
          <select name="theme" onChange={this.handleChange}>
            <option default value="Dinner With The Family">Dinner With The Family</option>
            <option value="Typical Day in the Office">Typical Day in the Office</option>
            <option value="Party Time">Party Time</option>
          </select>
        </label>
        <br />
        <input type="submit" value="Start Game!" id="bango-submit"/>
      </form>
      </div>
    )
  }

  renderBingoMenu = () => {
    this.setState({gameChosen: "pending"})
  }

  switchToEditMode = () => {
    this.setState({editMode: true})
  }

  exitEditMode = () => {
    this.setState({editMode: false})
  }

  render(){
    const {currentUser} = this.props;
    let finalDiv;
    if (this.state.editMode){
      finalDiv = <Editor exit={this.exitEditMode} />
    } else if (this.state.gameChosen === "bingo"){
      finalDiv = <BingoGameComponent io={this.io} reset={this.resetProfileScreen} roomName={this.state.roomName} />
    } else if(this.state.gameChosen === "bango"){
      finalDiv = <BangoGameComponent io={this.io} reset={this.resetProfileScreen} roomName={this.state.roomName} />
    } else if(this.state.gameChosen === "pending"){
      finalDiv = <form onSubmit={this.startBingoGame} className="room-form-container center-vertically">
        <label>
          Game Room Name:
          <input
            type="text"
            name="roomName"
            placeholder={`${this.props.currentUser.username}'s Room`}
            value={this.state.roomName}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Start Game!" />
      </form>
    } else if(this.state.roomList.length > 0){
      finalDiv = <div>{this.renderRoomList()}</div>
    } else if(this.state.theme){
      finalDiv = <div>{this.renderBangoMenu()}</div>
    } else {
      finalDiv = <div className="choose-game-container center-vertically"><button onClick={this.renderBingoMenu}>Start a New <span id="bingo-style">Bingo</span> Game</button><br />
      <button onClick={this.handleButton}>Start a New <span id="bango-style">Bango</span> Game</button><br />
      <button onClick={this.showRooms}>Join a Game</button>
      <button onClick={this.switchToEditMode}>Edit Bango Values</button>
      </div>
    }

    return (
      <div className="profile-page-container">
        <div className="user-navbar-container">
          <ul>
            <li>Username: {currentUser.username}</li>
            <li>Wins: {currentUser.wins}</li>
            <li id="final-nav-item">Losses: {currentUser.losses}</li>
            <li><button onClick={this.handleLogOut}>Log Out</button></li>
          </ul>
        </div>
        {finalDiv}
      </div>
    )
  }

};

const mapStateToProps = state => {
  return { currentUser: state.currentUser }
};

const mapDispatchToProps = dispatch => {
  return {
    getValues: (data) => dispatch(valueGetter(data)),
    logOut: () => dispatch(logUserOut()),
    authorizeUser: (token) => dispatch(checkAuth(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
