import React, { Component } from 'react';
import './App.css';
import  * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyD-_Fk2Jo9O-cMExcdbp1U9bmXu9eyReN0",
  authDomain: "bloc-chat-c2179.firebaseapp.com",
  databaseURL: "https://bloc-chat-c2179.firebaseio.com",
  projectId: "bloc-chat-c2179",
  storageBucket: "bloc-chat-c2179.appspot.com",
  messagingSenderId: "239840426319"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
      activeRoomId: ""
      }
      this.handleRoomClick = this.handleRoomClick.bind(this);
    }

    handleRoomClick(room) {
      this.setState({
        activeRoom: room.name,
        activeRoomId: room.key,
      });
    }
    

  
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <RoomList firebase={firebase}
          handleRoomClick={this.handleRoomClick} />

        <div id="active-room">
          {this.state.activeRoom}
        </div>

        <div id="messages">
        <MessageList firebase={firebase}
         roomId={this.state.activeRoomId} />
        </div>

      </div>
    );
  }
}

export default App;
