import React, { Component } from "react";


class MessageList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: []
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

	
	render() {

		return(
			<section className="message-list">
			  <h3>Chatting in RoomID: {this.props.roomId}</h3>
			  
			    {this.state.messages.filter(message => message.roomId === this.props.roomId ).map( message =>
				  <div id="message" key={message.key}>
				    <span>RoomID for Message: {message.roomId}</span>
			  	    <div>{message.content}</div>
			  	    <div>{message.sentAt}</div>
			  	 </div>
			  	)
			}  		  	
			  
			</section>
			);
		}
	
}


export default MessageList;