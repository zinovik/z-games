import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { Header } from '../header';
import { GamesServices } from '../../services';

import './index.scss';

function RulesPagePure() {
  const [gameNameRules, setGameNameRules] = useState('');

  const handleGameNameClick = (gameName: string) => {
    if (gameName === gameNameRules) {
      return setGameNameRules('');
    }

    setGameNameRules(gameName);
  };

  return (
    <main className="rules-page-container">
      <Header />

      <div className="rules-page-content">
        <div className="rules-page-data">
          {Object.keys(GamesServices).map(gameName => (
            <Fragment key={`${gameName}rules`}>
              <Typography
                variant="h5"
                onClick={() => {
                  handleGameNameClick(gameName);
                }}
                className="rules-page-game-name"
              >
                {gameName}
              </Typography>
              {GamesServices[gameName].getRules().map(
                (rule, index) =>
                  gameNameRules === gameName && (
                    <Typography gutterBottom={true} key={`${gameName}${index}`}>
                      {rule}
                    </Typography>
                  ),
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export const RulesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RulesPagePure);
