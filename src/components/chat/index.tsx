import React from 'react';
import { array, func } from 'prop-types';

import { NewMessage, LogsList } from '../../components';
import * as types from '../../constants';
import './index.css';

export const Chat = ({ logs, newMessage }: { logs: types.Log[], newMessage: (message: string) => void }) => {
  return (
    <div className='chat-container'>
      <div className='chat-new-message'>
        <NewMessage newMessage={newMessage} />
      </div>
      <div className='chat-logs'>
        <LogsList logs={logs} />
      </div>
    </div>
  );
};

Chat.propTypes = {
  logs: array.isRequired,
  newMessage: func.isRequired,
};

Chat.defaultProps = {
  logs: [],
  newMessage: () => console.log,
};
