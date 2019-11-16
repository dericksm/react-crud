import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import FormItem from '../../FormItem/FormItem';

class ModalRestaurant extends Component {

  componentWillMount() {
    console.log(this.props.restaurant)
  }


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
            restaurant={this.props.restaurant}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalRestaurant;
