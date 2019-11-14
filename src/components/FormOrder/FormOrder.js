import React, { Component } from 'react';
import { Message, Button, Form, Select, Container, Grid, Header } from 'semantic-ui-react';
import axios from 'axios';
import { getToken } from '../../services/Auth'
import HeaderComp from '../Header/Header'
import { withRouter } from 'react-router';
import './FormOder.css';
import { get, map } from 'lodash'
let token = null

const restaurants = []
const items = []
const arr = []

class FormOrder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      price: '',
      restaurantId: ''
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
          response.data.restaurants.forEach((restaurant, index) => {
            restaurants.push({ "key": Math.random(), "value": restaurant._id, "text": restaurant.name })
          })
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
      quantity: this.state.quantity,
      price: this.state.price,
      restaurantId: this.state.restaurantId
    }

    console.log(item)
    axios({
      method: `POST`,
      responseType: 'json',
      url: `http://localhost:3000/order`,
      headers: { 'x-access-token': token },
      data: item,

    })
      .then((response) => {
        this.setState({
          formClassName: 'success',
          formSuccessMessage: response.data.message
        });

        this.setState({
          name: '',
          quantity: '',
          price: '',
          restaurantId: ''
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
      });
  }

  handleChange = (e, data) => {
    this.setState({ price: data.options[0].price });

  }

  handleSelectChange = (e, data) => {

    this.setState({ restaurantId: data.value });

    axios.get(`http://localhost:3000/item`, {
      headers: { 'x-access-token': token },
    })
      .then((response) => {
        response.data.items.forEach((item) => {
          items.push({ "key": Math.random(), "value": item._id, "text": item.name, "price": item.price, "restaurant": item.restaurantId })
        })
      })
      .catch((err) => {
        console.log(err);
      });
    this.state.items = ''

    items.forEach((item) => {
      if (item.restaurant == this.state.restaurantId) {
        arr.push(item)
      }
    })

    console.log(arr)

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
              Pedidos:
        </Header>
            <Form className={formClassName} onSubmit={this.handleSubmit}>
              <Form.Field
                control={Select}
                label='Restaurante'
                options={restaurants}
                placeholder='Restaurante'
                value={this.state.restaurantId}
                required
                onChange={this.handleSelectChange}
              />
              <Form.Field
                control={Select}
                label='Item'
                placeholder='Porção de fritas'
                options={
                  arr.map(item => ({
                    key: item.key,
                    value: item.value,
                    text: item.text,
                    price: item.price,
                    restaurant: item.restaurant,

                  }))}
                value={this.state.name}
                required
                onChange={this.handleChange}
              />
              <Form.Input
                readOnly="true"
                label='Preço em R$'
                type='number'
                name='price'
                maxLength='30'
                required
                value={this.state.price}
                onChange={this.handleInputChange}
              />

              <Form.Input
                label='Quantidade'
                type='number'
                name='quantity'
                maxLength='30'
                required
                value={this.state.quantity}
                onChange={this.handleInputChange}
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
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(FormOrder);
