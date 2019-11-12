import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { Button, Modal } from 'semantic-ui-react';

import FormUser from '../FormUser/FormUser';




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
      <Modal open="true">
          <Modal.Header>Cadastro de usuário</Modal.Header>
          <Modal.Content>
            <FormUser
              buttonSubmitTitle="Cadastrar"
              buttonColor="green"
              onUserAdded={this.props.onUserAdded}/>
          </Modal.Content>
        </Modal>
      </Container>
    );
  }

}

export default SignUp;
