import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';
import { getToken } from '../../../services/Auth';

class ModalConfirmDelete extends Component {

  constructor(props) {
    super(props);

    this.state ={
      modalOpen: false
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen = e => this.setState({ modalOpen: true });
  handleClose = e => this.setState({ modalOpen: false });

  handleSubmit(e) {
    axios.delete(`http://localhost:3000/item/${this.props.item._id}`,{
    headers: { 'x-access-token': getToken() }
   })
    .then((response) => {
      this.props.update()
      this.handleClose();
    })
    .catch((err) => {      
      this.handleClose();
      throw err;
    });
  }

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen} color="red">Deletar</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        dimmer='inverted'
        size='tiny'
      >
        <Modal.Header>Deletar item</Modal.Header>
        <Modal.Content>
          <p>Tem certeza que deseja deletar o item: <strong>{this.props.item.name}</strong>?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleSubmit} color='red'>Sim</Button>
          <Button onClick={this.handleClose} color='black'>Não</Button>
          </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalConfirmDelete;
