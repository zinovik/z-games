import React from 'react';
import { Snackbar } from '@material-ui/core';

export function Notification() {
  return (
    <Snackbar
      open={true}
    />
  );
};

Notification.propTypes = {
};

Notification.defaultProps = {
};
