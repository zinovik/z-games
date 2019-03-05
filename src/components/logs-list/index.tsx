import React from 'react';
import { array } from 'prop-types';

import { Log } from '../../components';
import * as types from '../../constants';
import './index.css';

export function LogsList({ logs }: {
  logs: types.Log[],
}) {
  return (
    <div className='logs-list-container'>
      {logs.map(({ type, text, createdAt, user: { username } }, index) => (
        <div key={index}>
          <Log
            type={type}
            text={text}
            createdAt={createdAt}
            username={username}
          />
        </div>
      ))}
    </div>
  );
};

LogsList.propTypes = {
  logs: array.isRequired,
};

LogsList.defaultProps = {
  logs: [],
};
