import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';


class FormUser extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      email: '',
      password: ''
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

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }

    // Acknowledge that if the user id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    const method = this.props.userID ? 'put' : 'post';
    const params = this.props.userID ? this.props.userID : '';
    console.log(user)
    axios({
      method: `POST`,
      responseType: 'json',
      url: `http://localhost:3000/users/register`,
      data: user
    })
    .then((response) => {
      this.setState({
        formClassName: 'success',
        formSuccessMessage: response.data.msg
      });

      if (!this.props.userID) {
        this.setState({
          name: '',
          email: '',
          password: ''
        });
        this.props.onUserAdded(response.data.result);
      }
      else {
        this.props.onUserUpdated(response.data.result);
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
          label='Name'
          type='text'
          placeholder='Elon Musk'
          name='name'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Email'
          type='email'
          placeholder='elonmusk@tesla.com'
          name='email'
          maxLength='40'
          required
          value={this.state.email}
          onChange={this.handleInputChange}
        />
          <Form.Input
            label='Password'
            type='text'
            placeholder='18'
            name='password'
            value={this.state.password}
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

export default FormUser;
