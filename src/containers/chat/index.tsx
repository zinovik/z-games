import * as React from 'react';

import { LogsList } from '..';
import { NewMessage } from '../../components';
import * as types from '../../constants';

interface ChatProps extends React.Props<{}> {
  logs: types.Log[],
  newMessage: (message: string) => void,
}

export class Chat extends React.Component<ChatProps, {}> {
  render() {
    return (
      <div>
        <NewMessage newMessage={this.props.newMessage} />
        <LogsList logs={this.props.logs} />
      </div>
    );
  }
};
