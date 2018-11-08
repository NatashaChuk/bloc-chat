import React, { Component } from 'react';
import './App.css';
import  * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


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
      activeRoomId: "",
      user: null,
      };

      this.handleRoomClick = this.handleRoomClick.bind(this);
      this.setUser = this.setUser.bind(this);
    }

    setUser(user) {
      this.setState({user : user});
    };

    handleRoomClick(room) {
      this.setState({
        activeRoom: room.name,
        activeRoomId: room.key,
      });
      console.log(room);
    }
    

  
  render() {

     return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
         

        <div id="rooms">
          <RoomList firebase={firebase} handleRoomClick={this.handleRoomClick} />
        </div>

        <div id="user">
          <User firebase={firebase} setUser = {this.setUser} user = {this.state.user} />
        </div>

         <div id="active-room">
          <h3> Chatting in: {this.state.activeRoom} </h3>
         </div>

        <div id="messages">
          <MessageList firebase={firebase} roomId={this.state.activeRoomId} user={this.state.user} />
        </div>

      </div>
    );
  }
};

export default App;
