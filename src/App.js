import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  * as firebase from 'firebase';
import RoomList from './components/RoomList';


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


  }

  
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
