import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';

import TableUser from '../TableUser/TableUser';
import ModalUser from '../ModalUser/ModalUser';

import logo from '../../logo.svg';
import shirts from '../../shirts.png';
import './App.css';
import Login from '../Login/TableUser';

class App extends Component {

  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    this.state = {
      users: [],
      restaurants: [],
      items: []
    }

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleRestaurantAdded = this.handleRestaurantAdded.bind(this);
    this.handleUserAdded = this.handleUserAdded.bind(this);
    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
  }

  // Place socket.io code inside here
  componentDidMount() {
    this.fetchUsers();
  }

  // Fetch data from the back-end
  fetchUsers() {
    axios.get(`http://localhost:3000/users`, {
      headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzhiNTVhMDNmZWRiMTFkYzg1MDk5MyIsImlhdCI6MTU3MzQ1MDYwOSwiZXhwIjoxNTczNDU0MjA5fQ.9QpQL_KfEUeQ71ro2QE-G93DAAQgdHUXbJu7CQkzDR4' }
    })
    .then((response) => {
      console.log(response)
      this.setState({ users: response.data.users });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleRestaurantAdded(restaurant) {
    let restaurants = this.state.restaurants.slice();
    restaurants.push(restaurant);
    this.setState({ restaurants: restaurants });
  }

  handleUserAdded(user) {
    let users = this.state.users.slice();
    users.push(user);
    this.setState({ users: users });
  }

  handleItemAdded(item) {
    let items = this.state.items.slice();
    items.push(item);
    this.setState({ items: items });
  }

  handleUserUpdated(user) {
    let users = this.state.users.slice();
    for (let i = 0, n = users.length; i < n; i++) {
      if (users[i]._id === user._id) {
        users[i].name = user.name;
        users[i].email = user.email;
        users[i].age = user.age;
        users[i].gender = user.gender;
        break; // Stop this loop, we found it!
      }
    }
    this.setState({ users: users });
  }

  handleUserDeleted(user) {
    let users = this.state.users.slice();
    users = users.filter(u => { return u._id !== user._id; });
    this.setState({ users: users });
  }

  render() {

    let online = this.state.online;
    let verb = (online <= 1) ? 'is' : 'are'; // linking verb, if you'd prefer
    let noun = (online <= 1) ? 'person' : 'people';

    return (
      <div>
        <div className='App'>
          <div className='App-header'>           
          </div>
        </div>
        <Login></Login>
        <Container>
          <ModalUser
            headerTitle='Add User'
            buttonTriggerTitle='Add New'
            buttonSubmitTitle='Add'
            buttonColor='green'
            onUserAdded={this.handleUserAdded}
            onItemAdded={this.handleItemAdded}
            onRestaurantAdded={this.handleRestaurantAdded}
            server={this.server}
          />
          <em id='online'>{`${online} ${noun} ${verb} online.`}</em>
          <TableUser
            onUserUpdated={this.handleUserUpdated}
            onUserDeleted={this.handleUserDeleted}
            users={this.state.users}
            server={this.server}
            socket={this.socket}
          />
        </Container>
        <br/>
      </div>
    );
  }
}

export default App;
