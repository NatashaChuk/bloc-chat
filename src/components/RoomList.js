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

	createRoom(e) {
		e.preventDefault();

		this.roomsRef.push({
			name: this.state.newRoom
		});

		this.setState({
			newRoom: ""
		});
	};

	handleChange(e) {
		this.setState({
			newRoom: e.target.value
		});
	};

	deleteRoom(room) {

		const roomKey = this.props.activeRoomId;
		this.roomsRef.child(room.key).remove();

		this.setState({
			rooms: this.state.rooms.filter(room => room.key !== roomKey)
		});
	}


render() {
	return (
		<section className="room-list">
		  	{
				this.state.rooms.map( (room) => 
			 	 <div key={room.key}>
			 	  <div onClick={(e) => 
			 	 	{this.props.handleRoomClick(room)}}> {room.name} </div>
			 	 
			 	 	<button 
			 	 	  type="submit"
			 	 	  value="Delete Room"
			 	 	  onClick={this.deleteRoom}>
			 	 	  Delete Room
			 	 	</button>
		  		</div>
		 		)
		 	}
		 
		  <div id="create-room">
		  <form onSubmit={this.createRoom}>
		  	<input 
		  	 type = "text"
		  	 placeholder="Add New Room"
		  	 onChange={(e) => this.handleChange(e)}
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