import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';

import { withRouter } from 'react-router';
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


    axios({
      method: `POST`,
      responseType: 'json',
      url: `http://localhost:3000/users/register`,
      data: user
    })
      .then((response) => {
        debugger
        this.setState({
          formClassName: 'success',
          formSuccessMessage: response.data.msg
        });

        this.setState({
          name: '',
          email: '',
          password: ''
        });
        this.props.onUserAdded(response.data.result);
        // this.props.history.push('/');
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
      })
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
          required
          type='password'
          placeholder='18'
          name='password'
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <Message
          success
          color='green'
          header='Logado sucesso!'
          content={formSuccessMessage}
        />
        <Message
          warning
          color='yellow'
          header='E-mail ou senha incorretos!'
          content={formErrorMessage}
        />
        <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    );
  }
}

export default withRouter(FormUser)
