import React, { Component , useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUserViaToken } from '../actions/userActions';

export function ChatContainer(props) {
     const [showChat, updateChatState] = useState(false);
     const toggleChat = () => {updateChatState(!showChat)}
     let room = props.roomName ? props.roomName : "lobby";
     return <div>
               <button onClick={toggleChat}>Chat</button>
               { showChat ?  <ChatLog io={props.io} roomName={room} /> : " " }
          </div>
}

function ChatLog(props){
     const [showLog, updateLog] = useState([]);
     useEffect(() => {
          props.io.on('receive_chat', (chatlog) => {
               updateLog(chatlog);
          })
          getLog(props.roomName);
     }, [])
     const getLog = roomName => {
          props.io.emit('get_chat', roomName);
     }
     return (
          <div className="chat-box">
               <div className="chat-log">
                    { showLog.map((msg, index) => <p key={index}>{msg.user}: {msg.string}</p>) }
               </div>
               <ConnectChatInput io={props.io} getLog={getLog} roomName={props.roomName} />
          </div>
     );
}

class ChatInput extends Component {
     constructor(props){
          super(props);
          this.state = { message: "" };
     }
     sendMessage = event => {
          event.preventDefault();
          this.props.io.emit('send_chat_message', this.props.roomName, this.props.currentUser.username, this.state.message);
          this.setState({ message: "" });
          this.props.getLog(this.props.roomName);
     }
     handleChange = event => {
          this.setState({ message: event.target.value })
     }
     render(){
          return <form onSubmit={this.sendMessage}>
                    <input type="text" value={this.state.message} onChange={this.handleChange} />
                    <button type="submit">↑</button>
               </form>
     }
}

const mapStateToProps = state => {
     return { currentUser: state.currentUser };
};
const mapDispatchToProps = dispatch => {
     return { getUserUsingToken: token => dispatch(getUserViaToken(token)) };
}
const ConnectChatInput = connect(mapStateToProps, mapDispatchToProps)(ChatInput);