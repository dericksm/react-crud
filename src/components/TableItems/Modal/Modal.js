import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import FormItem from '../../FormItem/FormItem';

class ModalRestaurant extends Component {

  componentWillMount(){
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
            item={this.props.item}
            update={this.props.update}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalRestaurant;
