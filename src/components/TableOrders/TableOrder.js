import React, { Component } from 'react';
import { Table, Container, Header, Grid, Search } from 'semantic-ui-react';

import { debounce } from 'lodash'
import axios from 'axios';
import HeaderComp from '../Header/Header'

import ModalConfirmDelete from './ModalConfirmDelete/ModalConfirmDelete';
let orders

class TableOrder extends Component {
  constructor() {
    super();
  }

  

  render() {

    orders = this.props.orders;

    console.log(orders)
    orders = orders.map((order) =>
      <Table.Row key={order._id}>
        <Table.Cell>{order.name}</Table.Cell>
        <Table.Cell>{order.quantity}</Table.Cell>
        <Table.Cell>
          <ModalConfirmDelete
            headerTitle='Deletar'
            buttonTriggerTitle='Deletar'
            buttonColor='black'
            order={order}
            onUserDeleted={this.props.onUserDeleted}
          />
        </Table.Cell>
      </Table.Row>
    );

    // Make every new order appear on top of the list
    orders = [...orders].reverse();

    return (
      <Container>
        <HeaderComp></HeaderComp>
        <Container>

          <Grid textAlign='center' style={{ marginTop: '5vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Table singleLine style={{ height: '100vh' }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell>Quantidade</Table.HeaderCell>
                    <Table.HeaderCell>Editar</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {orders}
                </Table.Body>
              </Table>

            </Grid.Column>
          </Grid>

        </Container>
      </Container>
    );
  }
}

export default TableOrder
