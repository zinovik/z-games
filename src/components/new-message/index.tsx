import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button, Input } from '@material-ui/core';

import './index.css';

interface NewMessageProps extends React.Props<{}> {
  newMessage: (message: string) => void,
}

export class NewMessage extends React.Component<NewMessageProps, {}> {
  static propTypes = {
    newMessage: PropTypes.func.isRequired,
  }

  state = {
    message: '',
  };

  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleNewMessageClick = () => {
    const { newMessage } = this.props;
    const { message } = this.state;

    newMessage(message);
  };

  render() {

    return (
      <div>
        <Input type="text" placeholder="Message" onChange={this.handleMessageChange} className='new-message-input' />
        <Button variant='contained' onClick={this.handleNewMessageClick}>Send</Button>
      </div>
    );
  }
}
