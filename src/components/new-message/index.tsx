import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button, Input } from '@material-ui/core';

interface NewMessageProps extends React.Props<{}> {
  newMessage: any,
}

export class NewMessage extends React.Component<NewMessageProps, {}> {
  static propTypes = {
    newMessage: PropTypes.func.isRequired,
  }

  state = {
    message: '',
  };

  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };

  render() {
    const { newMessage } = this.props;
    const { message } = this.state;

    return (
      <div>
        <Input type="text" placeholder="Message" onChange={this.handleMessageChange} />
        <Button variant='contained' color='primary' onClick={() => { newMessage(message); }}>Send</Button>
      </div>
    );
  }
}
