import * as React from 'react';

import { Log } from '../../components';
import * as types from '../../constants';
import './index.css';

interface LogsListProps extends React.Props<{}> {
  logs: types.Log[],
}

export class LogsList extends React.Component<LogsListProps, {}> {
  render() {
    const { logs } = this.props;

    return (
      <div className='logs-list-container'>
        {logs.map((log, index) => (
          <div key={index}>
            <Log
              type={log.type}
              text={log.text}
              createdAt={log.createdAt}
              username={log.user.username}
            />
          </div>
        ))}
      </div>
    );
  }
};
