import React, { ChangeEvent, KeyboardEvent, useState, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { string } from 'prop-types';
import { Button, Input } from '@material-ui/core';

import { sendMessage as sendMessageWithoutDispatch } from '../../actions';

import './index.scss';

function NewMessagePure({ gameId, sendMessage }: {
  gameId: string,
  sendMessage: ({ gameId, message }: { gameId: string, message: string }) => void,
}) {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && message) {
      handleNewMessageClick();
    }
  }

  const handleNewMessageClick = () => {
    sendMessage({ gameId, message });

    setMessage('');
  };

  return (
    <div className='new-message-container'>
      <Input
        type="text"
        placeholder="Message"
        value={message}
        onChange={handleMessageChange}
        onKeyPress={handleKeyPress}
        className='new-message-input'
      />

      <Button
        onClick={handleNewMessageClick}
        className='new-message-button'
        disabled={!message}
      >
        Send
      </Button>
    </div>
  );
};

NewMessagePure.propTypes = {
  gameId: string.isRequired,
};

NewMessagePure.defaultProps = {
  gameId: '',
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendMessage: bindActionCreators(sendMessageWithoutDispatch, dispatch),
});

export const NewMessage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMessagePure as ComponentType<any>);
