import React, { Fragment, useState, ChangeEvent } from 'react';
import { string, func } from 'prop-types';
import { Typography, TextField, Button } from '@material-ui/core';

import './index.scss';

export function ChangeServer({ serverUrl, updateServerUrl }: {
  serverUrl: string,
  updateServerUrl: (serverUrl: string) => void,
}) {
  const [currentServerUrl, setCurrentServerUrl] = useState('');
  const [isServerUrlInputShowed, setIsServerUrlInputShowed] = useState(false);

  const handleServerUrlClick = () => {
    setCurrentServerUrl(serverUrl);
    setIsServerUrlInputShowed(true);
  };

  const handleCurrentServerUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentServerUrl(event.target.value);
  };

  const handleServerUrlChange = (isSave: boolean) => {
    if (isSave) {
      updateServerUrl(currentServerUrl);
    } else {
      setCurrentServerUrl(serverUrl);
    }

    setIsServerUrlInputShowed(false);  
  };

  return (
    <Fragment>

      {!isServerUrlInputShowed && <Typography onClick={handleServerUrlClick}>
        {serverUrl}
      </Typography>}

      {isServerUrlInputShowed && <Fragment>

        <TextField
          type='text'
          value={currentServerUrl}
          onChange={handleCurrentServerUrlChange}
        />

        <div className='change-server-buttons'>
        <Button onClick={() => { handleServerUrlChange(true) }}>
          Update
        </Button>

        <Button onClick={() => { handleServerUrlChange(false) }}>
          Cancel
        </Button>
        </div>

      </Fragment>}

    </Fragment>
  );
}

ChangeServer.propTypes = {
  serverUrl: string.isRequired,
  updateServerUrl: func.isRequired,
};

ChangeServer.defaultProps = {
  serverUrl: '',
  updateServerUrl: () => null,
};
