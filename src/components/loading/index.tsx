import React from 'react';
import { bool } from 'prop-types';
import { Dialog, DialogTitle, DialogContent, Typography, CircularProgress } from '@material-ui/core';

export function Loading({ isConnected }: {
  isConnected: boolean,
}) {
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
};

Loading.propTypes = {
  isConnected: bool.isRequired,
};

Loading.defaultProps = {
  isConnected: false,
};
