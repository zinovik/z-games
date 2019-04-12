import React from 'react';
import { Fab } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';

import './index.scss';

export function BackToTop() {
  const handleBackToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className='back-to-top-button'>
      <Fab onClick={handleBackToTop}>
        <ArrowUpward />
      </Fab>
    </div>
  );
}

BackToTop.propTypes = {
};

BackToTop.defaultProps = {
};
