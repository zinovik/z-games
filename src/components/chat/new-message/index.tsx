import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { string, func } from 'prop-types';
import { Button, Input } from '@material-ui/core';

import './index.scss';

export function NewMessage({
  gameId,
  sendMessage,
}: {
  gameId: string;
  sendMessage: (parameters: { gameId: string; message: string }) => void;
}) {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && message) {
      handleNewMessageClick();
    }
  };

  const handleNewMessageClick = () => {
    sendMessage({ gameId, message });

    setMessage('');
  };

  return (
    <div className="new-message-container">
      <Input
        type="text"
        placeholder="Message"
        value={message}
        onChange={handleMessageChange}
        onKeyPress={handleKeyPress}
        className="new-message-input"
      />

      <Button onClick={handleNewMessageClick} className="new-message-button" disabled={!message}>
        Send
      </Button>
    </div>
  );
}

NewMessage.propTypes = {
  gameId: string.isRequired,
  sendMessage: func.isRequired,
};

NewMessage.defaultProps = {
  gameId: '',
  sendMessage: () => null,
};
