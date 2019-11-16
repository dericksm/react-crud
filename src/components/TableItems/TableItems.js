import React, { Component } from 'react';
import { Table, Container, Header, Grid, Search } from 'semantic-ui-react';

import { getToken } from '../../services/Auth'
import { debounce } from 'lodash'
import axios from 'axios';
import HeaderComp from '../Header/Header'

import ModalRestaurant from './Modal/Modal'
import ModalConfirmDelete from './ModalConfirmDelete/ModalConfirmDelete';
let items
class TableItems extends Component {
  constructor() {
    super();

    this.state = {
      items: []
    }
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    console.log(value)
    axios.get(`http://localhost:3000/item/name/${value}`,
      {
        headers: { 'x-access-token': getToken() }
      })
      .then(response => {
        if (response.data.item != null) {
          this.setState({
            items: response.data.item
          })

          items = response.data.item

        }
      }).catch()

  }

  render() {

    this.setState({ items: this.props.items })


    items = this.state.items.map((item) =>
      <Table.Row key={item._id}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.description}</Table.Cell>
        <Table.Cell>{item.price}</Table.Cell>
        <Table.Cell>
          <ModalRestaurant
            headerTitle='Editar'
            buttonTriggerTitle='Editar'
            buttonSubmitTitle='Salvar'
            buttonColor='blue'
            item={item}
          />
          <ModalConfirmDelete
            headerTitle='Deletar'
            buttonTriggerTitle='Deletar'
            buttonColor='black'
            item={item}
          />
        </Table.Cell>
      </Table.Row>
    );

    // Make every new restaurant appear on top of the list
    items = [...items].reverse();

    return (
      <Container>
        <HeaderComp></HeaderComp>
        <Container>
        <label>Pesquisar</label>
              <Search

                onResultSelect={this.handleResultSelect}
                onSearchChange={debounce(this.handleSearchChange, 500, {
                  leading: true,
                })}
              />
          <Grid textAlign='center' style={{ marginTop: '5vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>

              <Table singleLine style={{ height: '100vh' }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nome</Table.HeaderCell>
                    <Table.HeaderCell>Drscrição</Table.HeaderCell>
                    <Table.HeaderCell>Preço</Table.HeaderCell>                    
                    <Table.HeaderCell>Editar</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {items}
                </Table.Body>
              </Table>

            </Grid.Column>
          </Grid>

        </Container>
      </Container>
    );
  }
}

export default TableItems
