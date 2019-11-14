import React, { Component } from 'react';
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Modal, Form, Message, Button, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router';

import { Link } from 'react-router-dom';


class HeaderComp extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as={Link} to='/' header>
              Restaurante Dodói
        </Menu.Item>
            <Menu.Item as={Link} to='/orders'>Pedidos</Menu.Item>
            <Menu.Item as={Link} to='/users'>Usuários</Menu.Item>
            <Dropdown item simple text='Cadastros'>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/restaurant'>Restaurantes</Dropdown.Item>
                <Dropdown.Item as={Link} to='/item'>Itens</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown item simple text='Listas'>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/listRestaurant'>Restaurantes</Dropdown.Item>
                <Dropdown.Item as={Link} to='/listItem'>Itens</Dropdown.Item>
                <Dropdown.Item as={Link} to='/listOrder'>Compras</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
          </Container>
        </Menu>
      </Container>

    );
  }

}


export default withRouter(HeaderComp);
