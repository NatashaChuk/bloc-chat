import React, { Component } from "react";
import * as firebase from "firebase";

class MessageList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: []
		};

		this.messagesRef = this.props.firebase.database().ref("messages");
		
	}

	componentDidMount() {
		this.messagesRef.on("child_added", snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key;
			this.setState({messages: this.state.messages.concat(message)});
		})
	}

	
	render() {
		return(
			<section className="message-list">
			  {this.state.messages.map((message) => {
					if(message.roomId === activeRoom) {
						return <li key={message.key}>{message.content}</li>
				}
					return null;
				  		
			</section>
			);
		}
	
}


export default MessageList;