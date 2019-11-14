import React, { Component } from 'react';
import { Message, Button, Form, Select, Container, Grid, Header } from 'semantic-ui-react';
import axios from 'axios';
import { getToken } from '../../services/Auth'
import HeaderComp from '../Header/Header'
import { withRouter } from 'react-router';
import './FormItem.css';

const restaurants = []

let token = null
class FormItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      price: '',
      restaurantId: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentWillMount() {

    // Fill in the form with the appropriate data if user id is provided
    if (!this.props.loggedIn) {
      this.props.history.push('/');
    } else {
      token = getToken()
      axios.get(`http://localhost:3000/restaurant`, {
        headers: { 'x-access-token': token },
      })
        .then((response) => {

          console.log(response)
          response.data.restaurants.forEach((restaurant, index) => {
            restaurants.push({ "key": index, "value": restaurant._id, "text": restaurant.name })
          })


          console.log(restaurants)
        })
        .catch((err) => {
          console.log(err);
        });
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

    const item = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      restaurantId: this.state.restaurantId
    }
    
    console.log(item)
    axios({
      method: `POST`,
      responseType: 'json',
      url: `http://localhost:3000/item`,
      headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzhiNTVhMDNmZWRiMTFkYzg1MDk5MyIsImlhdCI6MTU3MzQ0MDk5MCwiZXhwIjoxNTczNDQ0NTkwfQ.yarjc27Vd4mfaXWOTL94eHAzA_rpg062_ifO65VeVNY' },
      data: item,

    })
      .then((response) => {
        this.setState({
          formClassName: 'success'
        });


        this.setState({
          name: '',
          description: '',
          price: '',
          restaurantId: ''
        });

      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            this.setState({
              formClassName: 'warning',
              formErrorMessage: err.response.data.Message
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

  handleSelectChange(e, data) {
    this.setState({ restaurantId: data.value });
  }



  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Container>
        <HeaderComp></HeaderComp>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Cadasstro de Itens:
        </Header>
            <Form className={formClassName} onSubmit={this.handleSubmit}>
              <Form.Input
                label='Nome'
                type='text'
                placeholder='Hamburguer'
                name='name'
                maxLength='20'
                required
                value={this.state.name}
                onChange={this.handleInputChange}
              />
              <Form.Input
                label='Descrição'
                type='text'
                placeholder='Duas carnes, queijo e molho casa'
                name='description'
                maxLength='30'
                required
                value={this.state.description}
                onChange={this.handleInputChange}
              />
              <Form.Input
                label='Preço'
                type='number'
                name='price'
                required
                value={this.state.price}
                onChange={this.handleInputChange}
              />
              <Form.Field
                control={Select}
                label='Restaurante'
                options={restaurants}
                placeholder='Restaurante'
                value={this.state.restaurantId}
                required
                onChange={this.handleSelectChange}
              />
              <Message
                success
                color='green'
                header='Nice one!'
                content={formSuccessMessage}
              />
              <Message
                warning
                color='yellow'
                header='Woah!'
                content={formErrorMessage}
              />
              <Button color="green" floated='right'>Cadastrar</Button>
              <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
            </Form></Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(FormItem);
