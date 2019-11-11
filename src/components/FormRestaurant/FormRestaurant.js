import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';


class FormRestaurant extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      category: '',
      about: '',
      hours: '',
      deliveryTime: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Fill in the form with the appropriate data if user id is provided
    if (this.props.userID) {
      axios.get(`${this.props.server}/api/users/${this.props.userID}`)
        .then((response) => {
          this.setState({
            name: response.data.name,
            email: response.data.email,
            password: response.data.password
          });
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

    const restaurant = {
      name: this.state.name,
      category: this.state.category,
      about: this.state.about,
      hours: this.state.hours,
      deliveryTime: this.state.deliveryTime
    }

    // Acknowledge that if the user id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    const method = this.props.userID ? 'put' : 'post';
    const params = this.props.userID ? this.props.userID : '';
    console.log(restaurant)
    axios({
      method: `POST`,
      responseType: 'json',
      url: `http://localhost:3000/restaurant`,
      headers: {'x-access-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzhiNTVhMDNmZWRiMTFkYzg1MDk5MyIsImlhdCI6MTU3MzQ1MDQ1NiwiZXhwIjoxNTczNDU0MDU2fQ.fTWGVBKrNqW7kMD2jA7r8FbOV1_27fbfXwcQE6tJXvU'},
      data: restaurant,
      
    })
      .then((response) => {
        this.setState({
          formClassName: 'success',
          formSuccessMessage: response.data.msg
        });

        if (!this.props.userID) {
          this.setState({
            name: '',
            category: '',
            about: '',
            hours: '',
            deliveryTime: ''
          });
          this.props.onRestaurantAdded(response.data.result);
        }
        else {
          this.props.onRestaurantUpdated(response.data.result);
        }

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

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
        <Form.Input
          label='Nome'
          type='text'
          placeholder='Elon Musk'
          name='name'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Categoria'
          type='text'
          placeholder='elonmusk@tesla.com'
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
          value={this.state.about}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Horário'
          type='text'
          placeholder='18'
          name='hours'
          value={this.state.hours}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Tempo de entrega'
          type='text'
          placeholder='18'
          name='deliveryTime'
          value={this.state.deliveryTime}
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
        <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    );
  }
}

export default FormRestaurant;
