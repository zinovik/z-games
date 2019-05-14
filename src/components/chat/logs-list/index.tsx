import React from 'react';
import { array } from 'prop-types';

import { Log } from './log';
import { ILog } from '../../../interfaces';

import './index.scss';

export function LogsList({ logs }: {
  logs: ILog[];
}) {
  return (
    <div className='logs-list-container'>
      {logs.map(({ type, text, createdAt, createdBy }, index) => (
        <Log
          type={type}
          text={text}
          createdAt={createdAt}
          username={createdBy && createdBy.username}
          key={index}
        />
      ))}
    </div>
  );
}

LogsList.propTypes = {
  logs: array.isRequired,
};

LogsList.defaultProps = {
  logs: [],
};
