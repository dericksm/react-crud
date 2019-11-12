import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import axios from 'axios';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
      email: this.state.email,
      password: this.state.password
    }

    axios({
      method: `POST`,
      responseType: 'json',
      url: `http://localhost:3000/users/authenticate`,
      data: user
    })
      .then((response) => {
        debugger
        console.log('saiu')
        this.setState({
          formClassName: 'success',
          formSuccessMessage: 'Deu certo'
        });

        this.props.onUserLogin(response.data.data.token)

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
      })
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Informe seus dados para entrar:
        </Header>
          <Form className={formClassName} size='large' onSubmit={this.handleSubmit}>
            <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='Endereço de e-mail'
              name="email"
              onChange={this.handleInputChange} />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Senha'
              type='password'
              name="password"
              onChange={this.handleInputChange}
            />

            <Button color='teal' fluid size='large'>
              Login
            </Button>

            <Message
              success
              color='green'
              header='Cadastrado sucesso!'
              content={formSuccessMessage}
            />

            <Message
              warning
              color='yellow'
              header='Woah!'
              content={formErrorMessage}
            />
          </Form>
          <Message>
            Não possui conta? <a href="/signup">Cadastre-se</a>
          </Message>


        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
