import React from 'react';
import { string } from 'prop-types';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

export function NotificationError({ message }: { message: string }) {

  const handleClose = () => {
    console.log('close');
  };

  return (
    <Snackbar
      open={false}
      autoHideDuration={6000}
    >
      <SnackbarContent
        message={message}
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            onClick={handleClose}
          >
            <Close />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

NotificationError.propTypes = {
  message: string,
};

NotificationError.defaultProps = {
  message: '',
};
