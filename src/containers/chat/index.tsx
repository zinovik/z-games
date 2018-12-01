import * as React from 'react';
import { Paper } from '@material-ui/core';

import { LogsList } from '..';
import { NewMessage } from '../../components';
import * as types from '../../constants';

interface ChatProps extends React.Props<{}> {
  logs: types.Log[],
  newMessage: (message: string) => void,
}

export class Chat extends React.Component<ChatProps, {}> {
  render() {
    const { newMessage, logs } = this.props;

    return (
      <Paper>
        <NewMessage newMessage={newMessage} />
        <LogsList logs={logs} />
      </Paper>
    );
  }
};
