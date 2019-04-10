import React from 'react';
import { number, string, func } from 'prop-types';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

export function Notification({ id, message, removeNotification }: {
  id: number,
  message: string,
  removeNotification: (errorId: number) => void,
}) {

  const handleClose = () => {
    removeNotification(id);
  };

  return (
    <Snackbar
      open={true}
      autoHideDuration={2000}
      onClose={handleClose}
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

Notification.propTypes = {
  id: number.isRequired,
  message: string.isRequired,
  removeNotification: func.isRequired,
};

Notification.defaultProps = {
  id: 0,
  message: '',
  removeNotification: () => null,
};
