import React from 'react';
import { array, func } from 'prop-types';
import { Paper } from '@material-ui/core';

import { LogsList } from '../../containers';
import { NewMessage } from '../../components';
import * as types from '../../constants';


export const Chat = ({ logs, newMessage }: { logs: types.Log[], newMessage: (message: string) => void }) => {
  return (
    <Paper>
      <NewMessage newMessage={newMessage} />
      <LogsList logs={logs} />
    </Paper>
  );
};

Chat.propTypes = {
  logs: array.isRequired,
  newMessage: func.isRequired,
};
