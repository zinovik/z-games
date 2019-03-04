import React, { Component, Props } from 'react';
import { bool } from 'prop-types';
import { Dialog, DialogTitle, DialogContent, Typography, CircularProgress } from '@material-ui/core';

interface LoadingProps extends Props<{}> {
  isConnected: boolean,
}

export class Loading extends Component<LoadingProps, {}> {

  static propTypes = {
    isConnected: bool.isRequired,
  };

  static defaultProps = {
    isConnected: false,
  };

  render() {
    const { isConnected } = this.props;

    return (
      <Dialog open={!isConnected} fullScreen={false}>

        <DialogTitle>
          Loading...&nbsp;
          <CircularProgress size={18} />
        </DialogTitle>

        <DialogContent>
          <Typography>
            Connecting to the server...
          </Typography>
        </DialogContent>

      </Dialog>
    );
  }

}
