import React from 'react';
import { number, string, func } from 'prop-types';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import './index.scss';

export function NotificationError({ id, message, removeError }: { id: number; message: string; removeError: (errorId: number) => void }) {
  const handleClose = () => {
    removeError(id);
  };

  return (
    <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <SnackbarContent
        message={message}
        className="notification-error"
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

NotificationError.propTypes = {
  id: number.isRequired,
  message: string.isRequired,
  removeError: func.isRequired,
};

NotificationError.defaultProps = {
  id: 0,
  message: '',
  removeError: () => null,
};
