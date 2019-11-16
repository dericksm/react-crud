import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import ListComponent from '../List/List'

import { getToken } from '../../services/Auth'
import './App.css';

import { login } from '../../services/Auth'
import FormRestaurant from '../FormRestaurant/FormRestaurant';
import FormItem from '../FormItem/FormItem';
import FormOrder from '../FormOrder/FormOrder';
import FormUser from '../FormUser/FormUser';
import TableUser from '../TableUser/TableUser';
import TableRestaurants from '../TableRestaurants/TableRestaurants';
import TableItems from '../TableItems/TableItems';
import TableOrder from '../TableOrders/TableOrder';


let token = 'null'
class App extends Component {

  constructor() {
    super();

    this.state = {
      users: [],
      restaurants: [],
      items: [],      
      orders: [],
      loggedIn: false
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
    axios.get(`http://localhost:3000/users`)
      .then((response) => {
        console.log(response)
        this.setState({ users: response.data.users });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fetchItems() {
    axios.get(`http://localhost:3000/item`, { headers: { 'x-access-token': token } })
      .then((response) => {
        console.log(response)
        this.setState({ items: response.data.items });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fetchOrders() {
    axios.get(`http://localhost:3000/order`, { headers: { 'x-access-token': token } })
      .then((response) => {
        console.log(response)
        this.setState({ orders: response.data.orders });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fetchRestaurants() {
    axios.get(`http://localhost:3000/restaurant`, { headers: { 'x-access-token': token } })
      .then((response) => {
        console.log(response)
        this.setState({ restaurants: response.data.restaurants });
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

  handleUserLogin = (res) => {
    login(res)
    this.setState({ loggedIn: true });
    token = getToken()

    this.fetchRestaurants();
    this.fetchItems();
    this.fetchOrders();
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

  handleUserDeleted() {
    console.log('derick')
    this.fetchUsers()
  }


  render() {

    return (
      <div>
        <div className='App'>
          <div className='App-header'>
            <BrowserRouter>
              <Switch>
                <Route exact path="/"
                  render={() => <Login onUserLogin={this.handleUserLogin} />}
                />

                <Route path="/a" component={ListComponent} />

                <Route path="/signup"
                  render={() => <SignUp onUserAdded={this.handleUserAdded} />}
                />

                <Route path="/restaurant"
                  render={() => <FormRestaurant loggedIn={this.state.loggedIn} onUserAdded={this.handleUserAdded} />}
                />
                <Route path="/item"
                  render={() => <FormItem loggedIn={this.state.loggedIn} />}
                />

                <Route path="/users"
                  render={() => <TableUser users={this.state.users} onUserDelete={this.handleUserDeleted} />}
                />

                <Route path="/listRestaurant"
                  render={() => <TableRestaurants restaurants={this.state.restaurants} onUserDelete={this.handleUserDeleted} />}
                />

                <Route path="/orders"
                  render={() => <FormOrder loggedIn={this.state.loggedIn} />}
                />

                <Route path="/listItem"
                  render={() => <TableItems items={this.state.items} loggedIn={this.state.loggedIn} />}
                />

                <Route path="/listOrder"
                  render={() => <TableOrder orders={this.state.orders} loggedIn={this.state.loggedIn} />}
                />

              </Switch>
            </BrowserRouter>
          </div>
        </div>

      </div>
    );
  }
}

export default App;


/* <Container>
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
          <TableUser
            onUserUpdated={this.handleUserUpdated}
            onUserDeleted={this.handleUserDeleted}
            users={this.state.users}
            server={this.server}
            socket={this.socket}
          />
        </Container> */