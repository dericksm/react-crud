import React, { Component } from 'react';
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Modal, Form, Message, Button, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router';

import axios from 'axios';
import { getToken } from '../../services/Auth'

import HeaderComp from '../Header/Header'
import './FormRestaurant.css';

let token = null

class FormRestaurant extends Component {


  constructor(props) {
    super(props);

    this.state = {
      name: '',
      category: '',
      about: '',
      hours: '',
      deliveryTime: '',
      showMe: true
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.restaurant) {
      this.setState({
        name: this.props.restaurant.name,
        category: this.props.restaurant.category,
        about: this.props.restaurant.about,
        hours: this.props.restaurant.hours,
        deliveryTime: this.props.restaurant.deliveryTime,
        showMe:false
      })
    } else if (!this.props.loggedIn) {
      this.props.history.push('/');
    } else {

      token = getToken()
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }


  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();

    if (this.props.restaurant) {
      const restaurant = {
        name: this.state.name,
        category: this.state.category,
        about: this.state.about,
        hours: this.state.hours,
        deliveryTime: this.state.deliveryTime
      }

      axios({
        method: `PUT`,
        responseType: 'json',
        url: `http://localhost:3000/restaurant/${this.props.restaurant._id}`,
        headers: { 'x-access-token': token },
        data: restaurant,

      })
        .then((response) => {
          this.setState({
            formClassName: 'success',
            formErrorMessage: "Atualizado com sucesso"
          });
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              this.setState({
                formClassName: 'warning',
                formErrorMessage: err.response.data.message
              });
            }
          }
          else {
            this.setState({
              formClassName: 'warning',
              formErrorMessage: 'Something went wrong. ' + err
            });
          }
        });

    } else {
      const restaurant = {
        name: this.state.name,
        category: this.state.category,
        about: this.state.about,
        hours: this.state.hours,
        deliveryTime: this.state.deliveryTime
      }

      axios({
        method: `POST`,
        responseType: 'json',
        url: `http://localhost:3000/restaurant`,
        headers: { 'x-access-token': token },
        data: restaurant,

      })
        .then((response) => {
          this.setState({
            formClassName: 'success',
          });

          this.setState({
            name: '',
            category: '',
            about: '',
            hours: '',
            deliveryTime: ''
          });


        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              this.setState({
                formClassName: 'warning',
                formErrorMessage: err.response.data.message
              });
            }
          }
          else {
            this.setState({
              formClassName: 'warning',
              formErrorMessage: 'Something went wrong. ' + err
            });
          }
        });
    }
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Container>
        {this.state.showMe ? <HeaderComp></HeaderComp> : null } 

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
          {this.state.showMe ? <Header as='h2' color='teal' textAlign='center'>Cadastro de Restaurante:</Header>  : null }
            <Form className={formClassName} size='large' onSubmit={this.handleSubmit}>
              <Form.Input
                label='Nome'
                type='text'
                placeholder='Padaria do Português'
                name='name'
                maxLength='40'
                required
                value={this.state.name}
                onChange={this.handleInputChange}
              />
              <Form.Input
                label='Categoria'
                type='text'
                placeholder='Padaria e confeitaria'
                name='category'
                maxLength='40'
                required
                value={this.state.category}
                onChange={this.handleInputChange}
              />
              <Form.Input
                label='Sobre'
                type='text'
                name='about'
                required
                placeholder='Há quarenta anos na região'
                value={this.state.about}
                onChange={this.handleInputChange}
              />
              <Form.Input
                label='Horário'
                type='text'
                placeholder='8 ás 19h'
                name='hours'
                required
                value={this.state.hours}
                onChange={this.handleInputChange}
              />
              <Form.Input
                label='Tempo de entrega em minutos'
                type='text'
                placeholder='20'
                name='deliveryTime'
                value={this.state.deliveryTime}
                onChange={this.handleInputChange}
                required
              />
              <Message
                success
                color='green'
                header='Cadastrado com sucesso'
                content={formSuccessMessage}
              />
              <Message
                warning
                color='yellow'
                header='Woah!'
                content={formErrorMessage}
              />
              <Button color="green" floated='center'>Cadastrar</Button>
              <br /><br />
            </Form>

          </Grid.Column>
        </Grid>


      </Container>

    );
  }
}

export default withRouter(FormRestaurant);
