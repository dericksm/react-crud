import React, { Component } from 'react';
import { Message, Button, Form, Select, Container, Grid, Header } from 'semantic-ui-react';
import axios from 'axios';
import { getToken } from '../../services/Auth'
import HeaderComp from '../Header/Header'
import { withRouter } from 'react-router';

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
    if (this.props.user) {
      console.log('entrou')
      this.setState({
        name: this.props.user.name,
        email: this.props.user.email,
        password: this.props.user.password
      })

    }
  }



  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(e) {

    if (this.props.user) {
      const user = {
        id: this.props.user._id,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
      axios({
        method: `PUT`,
        responseType: 'json',
        url: `http://localhost:3000/users/update`,
        data: user
      })
        .then((response) => {
          console.log(response)
          this.setState({
            formClassName: 'success',
            formSuccessMessage: response.data.msg
          });

          this.setState({
            name: '',
            email: '',
            password: ''
          });
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              this.setState({
                formClassName: 'warning',
                formErrorMessage: err.response.data.msg
              });
            }}
          })

            } else {


              e.preventDefault();

              const user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
              }
              console.log(user)
              axios({
                method: `POST`,
                responseType: 'json',
                url: `http://localhost:3000/users/register`,
                data: user
              })
                .then((response) => {
                  console.log(response)
                  this.setState({
                    formClassName: 'success',
                    formSuccessMessage: response.data.msg
                  });

                  this.setState({
                    name: '',
                    email: '',
                    password: ''
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
                })

            }
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
                  label='Senha'
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
                  header='Cadastrado com sucesso!'
                  content={formSuccessMessage}
                />
                <Message
                  warning
                  color='yellow'
                  header='Usuário já existe'
                  content={formErrorMessage}
                />
                <Button color="green" floated='right'>Criar usuário</Button>
                <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
              </Form>

            );
          }
        }

export default withRouter(FormUser)
