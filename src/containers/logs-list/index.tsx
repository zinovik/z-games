import * as React from 'react';

import { Log } from '../../components';
import * as types from '../../constants';

interface LogsListProps extends React.Props<{}> {
  logs: types.Log[],
}

export class LogsList extends React.Component<LogsListProps, {}> {
  render() {
    const { logs } = this.props;

    return (
      <div>
        {[...logs].reverse().map((log, index) => (
          <div key={index}>
            <Log
              type={log.type}
              text={log.text}
              createdAt={log.createdAt}
              username={log.id}
            />
          </div>
        ))}
      </div>
    );
  }
};
