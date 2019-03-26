import React from 'react';
import { array, string } from 'prop-types';

import { NewMessage, LogsList } from '../../components';
import { ILog } from '../../interfaces';

import './index.scss';

export function Chat({ logs, gameId }: {
  logs: ILog[],
  gameId: string,
}) {
  return (
    <div className='chat-container'>
      <div className='chat-new-message'>
        <NewMessage gameId={gameId} />
      </div>
      <div className='chat-logs'>
        <LogsList logs={logs} />
      </div>
    </div>
  );
};

Chat.propTypes = {
  logs: array.isRequired,
  gameId: string.isRequired,
};

Chat.defaultProps = {
  logs: [],
  gameId: '',
};
