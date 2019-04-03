import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { Header } from '../header';

import './index.scss';

function RulesPagePure() {
  return (
    <main className='rules-page-container'>
      <Header />

      <div className='rules-page-content'>
        <div className='rules-page-data'>
          <Typography variant='h5'>
            No, Thanks
          </Typography>

          <Typography variant='h5'>
            Perudo
          </Typography>

          <Typography variant='h5'>
            Lost Cities
          </Typography>
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export const RulesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RulesPagePure);
