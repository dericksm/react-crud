import React, { Component } from 'react';

import axios from 'axios';
import {  Modal, Container, Header } from 'semantic-ui-react';

import FormUser from '../FormUser/FormUser';
import HeaderComp from '../Header/Header';




class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUserAdded = this.handleUserAdded.bind(this);
  }

  componentWillMount() {

  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleUserAdded(user) {
    let users = this.state.users.slice();
    users.push(user);
    this.setState({ users: users });
  }



  render() {

    return (
      <Container>   
        <HeaderComp></HeaderComp>
      <Header as='h2' color='teal' textAlign='center' style={{ marginTop: '15vh' }}>
            Cadstro de Restaurante:
        </Header>
            <FormUser
              buttonSubmitTitle="Cadastrar"
              buttonColor="green"
              onUserAdded={this.props.onUserAdded}/>
      </Container>
    );
  }

}

export default SignUp;
