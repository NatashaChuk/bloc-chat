import React, { Component } from 'react';


class RoomList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rooms: []
		};

		this.roomsRef = this.props.firebase.database().ref('rooms');
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat( room ) });
		});
	}

	createRoom = event => {
		event.preventDefault();

		this.roomsRef.push({
			name: this.state.newRoom
		});

		this.setState({
			newRoom: ""
		});
	};

	handleChange = event => {
		this.setState({
			newRoom: event.target.value
		});
	};


render() {
	return (
		<section className="room-list">
		  	{
				this.state.rooms.map( (room, index) => 
			 	 <li key={index}> {room.name} </li>
		 		)
		 	}
		 
		  <div id="create-room">
		  <form onSubmit={this.createRoom}>
		  	<input 
		  	 type = "text"
		  	 placeholder="Add New Room"
		  	 onChange={event => this.handleChange(event)}
		  	 value={this.state.newRoom}
		  	 />
		  	 <input type="submit" />
		  </form>
		  </div>	
		</section>
		);
 	}
	
}


export default RoomList;