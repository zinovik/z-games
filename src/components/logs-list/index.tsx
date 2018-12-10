import React, { Component, Props } from 'react';
import { array } from 'prop-types';

import { Log } from '../../components';
import * as types from '../../constants';
import './index.css';

interface LogsListProps extends Props<{}> {
  logs: types.Log[],
}

export class LogsList extends Component<LogsListProps, {}> {
  static propTypes = {
    logs: array.isRequired,
  }

  static defaultProps = {
    logs: [],
  }

  render() {
    const { logs } = this.props;

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
  }
};
