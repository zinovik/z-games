import React from 'react';
import { bool, string } from 'prop-types';
import { Dialog, DialogTitle, DialogContent, Typography, CircularProgress } from '@material-ui/core';

export function Loading({ isConnected, text }: {
  isConnected: boolean,
  text?: string,
}) {
  return (
    <Dialog open={!isConnected} fullScreen={false}>

      <DialogTitle>
        Loading...&nbsp;
        <CircularProgress size={18} />
      </DialogTitle>

      {text && <DialogContent>
        <Typography>
          {text}
        </Typography>
      </DialogContent>}

    </Dialog>
  );
};

Loading.propTypes = {
  isConnected: bool.isRequired,
  text: string,
};

Loading.defaultProps = {
  isConnected: false,
};
