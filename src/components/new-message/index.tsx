import React, { Component, Props, ChangeEvent, KeyboardEvent } from 'react';
import { func } from 'prop-types';
import { Button, Input } from '@material-ui/core';

import './index.css';

interface NewMessageProps extends Props<{}> {
  newMessage: (message: string) => void,
}

export class NewMessage extends Component<NewMessageProps, {}> {
  static propTypes = {
    newMessage: func.isRequired,
  }

  static defaultProps = {
    newMessage: () => console.log,
  }

  public state = {
    message: '',
  };

  handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: event.target.value });
  };

  handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const { message } = this.state;

    if (event.key === 'Enter' && message) {
      this.handleNewMessageClick();
    }
  }

  handleNewMessageClick = () => {
    const { newMessage } = this.props;
    const { message } = this.state;

    newMessage(message);

    this.setState({ message: '' });
  };

  render() {
    const { message } = this.state;

    return (
      <div className='new-message-container'>
        <Input
          type="text"
          placeholder="Message"
          value={message}
          onChange={this.handleMessageChange}
          onKeyPress={this.handleKeyPress}
          className='new-message-input'
        />

        <Button
          variant='contained'
          onClick={this.handleNewMessageClick}
          className='new-message-button'
          disabled={!message}
        >
          Send
        </Button>
      </div>
    );
  }
}
