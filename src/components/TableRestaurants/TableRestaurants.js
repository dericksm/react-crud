import React, { Component } from 'react';
import { Table, Container, Header, Grid, Search } from 'semantic-ui-react';
import { debounce } from 'lodash'
import axios from 'axios';
import HeaderComp from '../Header/Header'
import { getToken } from '../../services/Auth'

import ModalRestaurant from './Modal/Modal'
import ModalConfirmDelete from './ModalConfirmDelete/ModalConfirmDelete';
let restaurants = []
class TableRestaurants extends Component {
  constructor() {
    super();

    this.state = {
      restaurants: []
    }
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    console.log(value)
    axios.get(`http://localhost:3000/restaurant/name/${value}`,
      {
        headers: { 'x-access-token': getToken() }
      })
      .then(response => {
        console.log(response)
        if (response.data.data.restaurant != null) {
          this.setState({restaurants: [response.data.data.restaurant]})
          restaurants.length = 0
          restaurants = response.data.restaurant

        }
      }).catch()

  }

  componentDidMount() {
    this.setState({restaurants : this.props.restaurants})
  }



  render() {

    restaurants = this.state.restaurants.map((restaurant) =>
      <Table.Row key={restaurant._id}>
        <Table.Cell>{restaurant.name}</Table.Cell>
        <Table.Cell>{restaurant.category}</Table.Cell>
        <Table.Cell>
          <ModalRestaurant
            headerTitle='Editar'
            buttonTriggerTitle='Editar'
            buttonSubmitTitle='Salvar'
            buttonColor='blue'
            restaurant={restaurant}
            onUserUpdated={this.props.onUserUpdated}
          />
          <ModalConfirmDelete
            headerTitle='Deletar'
            buttonTriggerTitle='Deletar'
            buttonColor='black'
            restaurant={restaurant}
            onUserDeleted={this.props.onUserDeleted}
          />
        </Table.Cell>
      </Table.Row>
    );

    // Make every new restaurant appear on top of the list
    restaurants = [...restaurants].reverse();

    return (
      <Container>
        <HeaderComp></HeaderComp>
        <Container>

          <Grid textAlign='center' style={{ marginTop: '5vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <label>Pesquisar</label>
              <Search

                onResultSelect={this.handleResultSelect}
                onSearchChange={debounce(this.handleSearchChange, 500, {
                  leading: true,
                })}
              />
              <Table singleLine style={{ height: '100vh' }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nome</Table.HeaderCell>
                    <Table.HeaderCell>Categoria</Table.HeaderCell>
                    <Table.HeaderCell>Editar</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {restaurants}
                </Table.Body>
              </Table>

            </Grid.Column>
          </Grid>

        </Container>
      </Container>
    );
  }
}

export default TableRestaurants
