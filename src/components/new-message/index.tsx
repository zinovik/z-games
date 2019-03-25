import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { string } from 'prop-types';
import { Button, Input } from '@material-ui/core';

import { sendMessage } from '../../actions';

import './index.scss';

export function NewMessage({ gameId }: {
  gameId: string,
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

NewMessage.propTypes = {
  gameId: string.isRequired,
};

NewMessage.defaultProps = {
  gameId: '',
};
