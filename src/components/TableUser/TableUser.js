import React, { Component } from 'react';
import { Table, Container, Header, Grid } from 'semantic-ui-react';

import ModalUser from '../ModalUser/ModalUser';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

import axios from 'axios';
import HeaderComp from '../Header/Header'
let users = []
class TableUser extends Component {
  constructor() {
    super();

    this.state = {
      orders: []
    }
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
        this.props.update()

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

  componentWillMount() {
    this.setState({users : this.props.users})
  }
  render() {   

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
            user={user}
            update={this.props.update}
          />
          <ModalConfirmDelete
            headerTitle='Deletar'
            buttonTriggerTitle='Deletar'
            buttonColor='black'
            user={user}
            update={this.props.update}
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
