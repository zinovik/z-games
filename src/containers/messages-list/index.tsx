import * as React from 'react';

import { Message } from '../../components';
import * as types from '../../constants';

interface MessagesListProps extends React.Props<{}> {
  messages: types.Message[],
}

export class MessagesList extends React.Component<MessagesListProps, {}> {
  render() {
    return (
      <div>
        {this.props.messages.map((message, index) => (
          <div key={index}>
            <Message
              type={message.type}
              time={message.time}
              username={message.username}
              text={message.text}
            />
          </div>
        ))}
      </div>
    );
  }
};