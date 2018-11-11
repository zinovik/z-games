import * as React from 'react';
import * as PropTypes from 'prop-types';

export const NewMessage = ({ newMessage }: { newMessage: any }) => {
  let message;

  return (
    <div>
      <input type="text" placeholder="Message" ref={node => (message = node)} />
      <button onClick={() => { newMessage(message.value); }}>Send</button>
    </div>
  );
}

NewMessage.propTypes = {
  newMessage: PropTypes.func.isRequired,
}
