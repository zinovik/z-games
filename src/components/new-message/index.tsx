import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { func } from 'prop-types';
import { Button, Input } from '@material-ui/core';

import './index.scss';

export function NewMessage({ newMessage }: {
  newMessage: (message: string) => void,
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
    newMessage(message);

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
  newMessage: func.isRequired,
};

NewMessage.defaultProps = {
  newMessage: () => console.log,
};
