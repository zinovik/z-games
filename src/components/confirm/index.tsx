import React from 'react';
import { string, func } from 'prop-types';
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@material-ui/core';

export function Confirm({ text, confirm }: {
  text: string;
  confirm: (isConfirmed: boolean) => void;
}) {
  return (
    <Dialog open={true} fullScreen={false}>

      <DialogTitle>
        Confirm action
      </DialogTitle>

      {text && <DialogContent>
        <Typography>
          {text}
        </Typography>
      </DialogContent>}

      <DialogActions>
        <Button onClick={() => { confirm(false); }} autoFocus={true}>
          No
        </Button>
        <Button onClick={() => { confirm(true); }}>
          Yes
        </Button>
      </DialogActions>

    </Dialog>
  );
};

Confirm.propTypes = {
  text: string.isRequired,
  confirm: func.isRequired,
};

Confirm.defaultProps = {
  text: '',
  confirm: () => null,
};
