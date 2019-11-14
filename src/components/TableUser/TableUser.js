import React, { Component } from 'react';
import { Table, Container, Header, Grid } from 'semantic-ui-react';

import ModalUser from '../ModalUser/ModalUser';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

import axios from 'axios';
import HeaderComp from '../Header/Header'

class TableUser extends Component {



  render() {

    let users = this.props.users;

    users = users.map((user) =>
      <Table.Row key={user._id}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>
          <ModalUser
            headerTitle='Edit User'
            buttonTriggerTitle='Edit'
            buttonSubmitTitle='Save'
            buttonColor='blue'
            userID={user._id}
            onUserUpdated={this.props.onUserUpdated}
            server={this.props.server}
            socket={this.props.socket}
          />
          <ModalConfirmDelete
            headerTitle='Delete User'
            buttonTriggerTitle='Delete'
            buttonColor='black'
            user={user}
            onUserDeleted={this.props.onUserDeleted}
            server={this.props.server}
            socket={this.props.socket}
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
