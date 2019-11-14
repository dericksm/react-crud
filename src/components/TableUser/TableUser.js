import React, { Component } from 'react';
import { Table, Container, Header, Grid } from 'semantic-ui-react';

import ModalUser from '../ModalUser/ModalUser';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

import axios from 'axios';
import HeaderComp from '../Header/Header'

class TableUser extends Component {
  constructor() {
    super();

    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
  }

  handleUserUpdated(user) {
    let users = this.props.users.slice();
    for (let i = 0, n = users.length; i < n; i++) {
      if (users[i]._id === user._id) {
        users[i].name = user.name;
        users[i].email = user.email;
        users[i].password = user.password;
        break; // Stop this loop, we found it!
      }
    }
    axios({
      method: `PUT`,
      responseType: 'json',
      url: `http://localhost:3000/users/update`,
      data: user
    })
      .then((response) => {
        this.setState({
          formClassName: 'success',
          formSuccessMessage: response.data.message
        });

      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            this.setState({
              formClassName: 'warning',
              formErrorMessage: err.response.data.msg
            });
          }
        }
      })
  }

  handleUserDeleted(user) {
    let users = this.props.users.slice();
    users = users.filter(u => { return u._id !== user._id; });
    axios.delete(`http://localhost:3000/users/delete`,{ data: { id: user._id } })
      .then((response) => {
        this.setState({
          formClassName: 'success',
          formSuccessMessage: response.data.msg
        });
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            this.setState({
              formClassName: 'warning',
              formErrorMessage: err.response.data.msg
            });
          }
        }
        else {
          this.setState({
            formClassName: 'warning',
            formErrorMessage: 'Something went wrong. ' + err
          });
        }
      })


  }




  render() {

    let users = this.props.users;

    users = users.map((user) =>
      <Table.Row key={user._id}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>
          <ModalUser
            headerTitle='Editar'
            buttonTriggerTitle='Editar'
            buttonSubmitTitle='Salvar'
            buttonColor='blue'
            userID={user._id}
            onUserUpdated={this.onUserUpdated}
          />
          <ModalConfirmDelete
            headerTitle='Deletar'
            buttonTriggerTitle='Deletar'
            buttonColor='black'
            user={user}
            onUserDeleted={this.onUserDeleted}
          />
        </Table.Cell>
      </Table.Row>
    );

    // Make every new user appear on top of the list
    users = [...users].reverse();

    return (
      <Container>
        <HeaderComp></HeaderComp>
        <Container>

          <Grid textAlign='center' style={{ marginTop: '5vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>

              <Table singleLine style={{ height: '100vh' }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nome</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Editar</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {users}
                </Table.Body>
              </Table>

            </Grid.Column>
          </Grid>

        </Container>
      </Container>
    );
  }
}

export default TableUser;
