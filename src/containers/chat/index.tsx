import * as React from 'react';

import { MessagesList } from '..';
import { NewMessage } from '../../components';
import * as types from '../../constants';

interface ChatProps extends React.Props<{}> {
  messages: types.Message[],
  newMessage: any,
}

export class Chat extends React.Component<ChatProps, {}> {
  render() {
    return (
      <div>
        <NewMessage newMessage={this.props.newMessage} />
        <MessagesList messages={this.props.messages} />
      </div>
    );
  }
};
