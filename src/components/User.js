import React, { Component } from 'react';
import * as firebase from 'firebase';


class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
		};

		this.handleSignIn = this.handleSignIn.bind(this);
		this.handleSignOut = this.handleSignOut.bind(this);
	}


	ComponentDidMount() {
		this.props.firebase.auth().onAuthStateChanged( user => {
			this.props.setUser(user);
		 });
	}


	handleSignIn(e) {
		const provider = new this.props.firebase.auth.GoogleAuthProvider();
		this.props.firebase.auth().signInWithPopup( provider ).then(result => { 
			const user = result.user;
			this.setState({ username : user });
		});
	}


	handleSignOut(e) {
		this.props.firebase.auth().signOut();
	}



	render() {
		return(
			<div id="sign-in">
			  <p> Signed in as: {this.props.user === null ? "Guest" : this.props.user.displayName }</p>
			  <div>
			   <button id="sign-in" onClick={(e) => {this.handleSignIn(e)} }> Sign In </button>
			   :
			   <button id="sign-out" onClick={(e) => {this.handleSignOut(e)}}> Sign Out </button>
			  
			  </div>
			</div>
		);
	}
}

export default User;