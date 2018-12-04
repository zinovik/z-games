import React, { Fragment } from 'react';
import { array, func } from 'prop-types';

import { LogsList } from '../../containers';
import { NewMessage } from '../../components';
import * as types from '../../constants';


export const Chat = ({ logs, newMessage }: { logs: types.Log[], newMessage: (message: string) => void }) => {
  return (
    <Fragment>
      <NewMessage newMessage={newMessage} />
      <LogsList logs={logs} />
    </Fragment>
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
