import React from 'react';
import { array, string, func } from 'prop-types';

import { NewMessage } from '../../components/new-message';
import { LogsList } from '../../components/logs-list';
import { ILog } from '../../interfaces';

import './index.scss';

export function Chat({ logs, gameId, sendMessage }: {
  logs: ILog[];
  gameId: string;
  sendMessage: (parameters: { gameId: string, message: string }) => void;
}) {
  return (
    <div className='chat-container'>
      <div className='chat-new-message'>
        <NewMessage gameId={gameId} sendMessage={sendMessage} />
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
  sendMessage: func.isRequired
};

Chat.defaultProps = {
  logs: [],
  gameId: '',
  sendMessage: () => null,
};
