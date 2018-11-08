import React, { Component } from "react";
import * as firebase from 'firebase';


class MessageList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
			newMessage: [],
		};

		this.messagesRef = this.props.firebase.database().ref("Messages");
		
	}

	componentDidMount() {
		this.messagesRef.on("child_added", snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key;
			this.setState({messages: this.state.messages.concat(message)});
			
		})
	}

	createMessage(e) {
		e.preventDefault();

		this.messagesRef.push({
			username: this.props.user.displayName,
			sentAt: firebase.database.ServerValue.TIMESTAMP,
			content: this.state.newMessage,
			roomId: this.props.activeRoomId
		});

		this.setState({
			newMessage: []
		});
	};


	handleChange(e) {
		this.setState({
			newMessage: e.target.value
		});
	};


	render() {

		return(
			<section className="message-list">
			 <div>		  
			    {this.state.messages.filter(message => message.roomId === this.props.roomId ).map( message =>
				  <div id="message" key={message.key}>
				    <div>{message.username}</div>
				    <div>{message.content}</div>
			  	    <div>{message.sentAt}</div>
			  	 </div>
			  	)
			}  		  	
			  
			</div>
			<form onSubmit={(e) => {this.createMessage(e)}}>
			  <input
			   type= "text"
			   value= {this.state.newMessage}
			   placeholder= "Add new message"
			   onChange= {(e) => {this.handleChange(e)}} />
			  <input type="submit"  value="Submit" />
			</form>
			</section>
			);
		}
	
}


export default MessageList;