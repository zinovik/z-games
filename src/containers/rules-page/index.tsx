import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { Header } from '../header';
import { GamesServices } from '../../services';

import './index.scss';

function RulesPagePure() {
  return (
    <main className='rules-page-container'>
      <Header />

      <div className='rules-page-content'>
        <div className='rules-page-data'>
          {Object.keys(GamesServices).map(gameName => (
            <Fragment key={`${gameName}rules`}>
              <Typography variant='h5'>
                {gameName}
              </Typography>
              {GamesServices[gameName].getRules().map((rule, index) => (
                <Typography gutterBottom={true} key={`${gameName}${index}`}>
                  {rule}
                </Typography>
              ))}
            </Fragment>
          ))}
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
