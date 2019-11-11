import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import FormUser from '../FormUser/FormUser';
import FormRestaurant from '../FormRestaurant/FormRestaurant';
import FormItem from '../FormItem/FormItem';

class ModalUser extends Component {

  render() {
    return (
      <Modal
        trigger={<Button color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
        dimmer='inverted'
        size='tiny'
        closeIcon='close'
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormItem
            buttonSubmitTitle={this.props.buttonSubmitTitle}
            buttonColor={this.props.buttonColor}
            onItemAdded={this.props.onItemAdded}
            onItemUpdated={this.props.onItemUpdated}
            server={this.props.server}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalUser;
