import React from 'react'

import TableUser from '../TableUser/TableUser';

import { Link } from 'react-router-dom';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from 'semantic-ui-react'

const ListComponent = () => (
  <div>
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
      </Container>
    </Menu>

    <Container text style={{ marginTop: '7em' }}>
      <TableUser user={[]}></TableUser>
    </Container>


  </div>
)

export default ListComponent