import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ScheduleCard } from '../../components/ScheduleCard';
import { deletePairingThunk } from '../../thunks/deletePairingThunk';
import { cancelMentorPairing } from '../../thunks/cancelMentorPairing';
import { cancelMenteePairing } from '../../thunks/cancelMenteePairing';
import { TemplateCard } from '../../components/TemplateCard';
import PropTypes from 'prop-types';
import { filterPastPairings } from '../../helpers';
import { Redirect } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

export class Schedule extends Component {
  state = {
    shouldRedirect: false
  };

  filterOpenings = () => {
    const { schedule, deletePairingThunk, user } = this.props;
    const openings = schedule.filter(pairing => {
      return pairing.pairee === null && filterPastPairings(pairing);
    });
    const cards = openings.map(booking => {
      return (
        <ScheduleCard
          booking={booking}
          person={null}
          user={user}
          key={booking.id}
          deletePairing={deletePairingThunk}
        />
      );
    });
    return cards.length ? cards.slice(0, 15) : <TemplateCard type='openings' />;
  };

  filterPaireeBookings = () => {
    const { schedule, user, cancelMentorPairing  } = this.props;
    const bookings = schedule.filter(pairing => {
      return (
        pairing.pairee !== null &&
        pairing.pairee.name === user.name &&
        filterPastPairings(pairing)
      );
    });
    const cards = bookings.map(booking => {
      return (
        <ScheduleCard
          booking={booking}
          person={booking.pairer}
          key={booking.id}
          user={user}
          cancelPairing={cancelMentorPairing}
        />
      );
    });
    return cards.length ? (
      cards.slice(0, 15)
    ) : (
      <TemplateCard type='receiving-help' />
    );
  };

  filterPairerBookings = () => {
    const { schedule, user, cancelMenteePairing } = this.props;
    const bookings = schedule.filter(pairing => {
      return (
        pairing.pairee !== null &&
        pairing.pairer.name === user.name &&
        filterPastPairings(pairing)
      );
    });
    const cards = bookings.map(booking => {
      return (
        <ScheduleCard
          booking={booking}
          person={booking.pairee}
          key={booking.id}
          user={user}
          cancelPairing={cancelMenteePairing}
        />
      );
    });
    return cards.length ? (
      cards.slice(0, 15)
    ) : (
      <TemplateCard type='giving-help' />
    );
  };

  render() {
    const { user } = this.props;
    const { shouldRedirect } = this.state;
    return (
      <div className='Schedule'>
        {!shouldRedirect && (
          <Fragment>
            <h2 className='Schedule--h2'>
              <span>{user.name}</span>, here is your pairing schedule{' '}
              <span role='img' aria-label='rocket ship emoji'>
                🚀
              </span>
            </h2>
            <div className='ScheduleCards--div'>
              <div>
                <h2 className='ScheduleCards--h2'>Giving Help</h2>
                {this.filterPairerBookings()}
              </div>
              <div>
                <h2 className='ScheduleCards--h2'>Receiving Help</h2>
                {this.filterPaireeBookings()}
              </div>
              <div>
                <h2 className='ScheduleCards--h2'>
                  Open to Pair{' '}
                  <div
                    className='Schedule--edit-icon'
                    onClick={() => this.setState({ shouldRedirect: true })}
                    data-tip='Edit availability'
                  />
                  <ReactTooltip />
                </h2>
                {this.filterOpenings()}
              </div>
            </div>
          </Fragment>
        )}
        {shouldRedirect && (
          <Redirect
            to={{
              pathname: '/edit-availability',
              state: { user }
            }}
          />
        )}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  schedule: state.schedule,
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  deletePairingThunk: id => dispatch(deletePairingThunk(id)),
  cancelMentorPairing: id => dispatch(cancelMentorPairing(id)),
  cancelMenteePairing: id => dispatch(cancelMenteePairing(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);

Schedule.propTypes = {
  deletePairingThunk: PropTypes.func,
  cancelMenteePairing: PropTypes.func,
  cancelMentorPairing: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  schedule: PropTypes.array,
  user: PropTypes.object
};
