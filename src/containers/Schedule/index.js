import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScheduleCard } from '../../components/ScheduleCard';
import { deletePairingThunk } from '../../thunks/deletePairingThunk';
import PropTypes from 'prop-types';

export class Schedule extends Component {
  filterOpenings = () => {
    const { schedule, deletePairingThunk } = this.props;
    const openings = schedule.filter(pairing => pairing.pairee === null);
    return openings.map(booking => {
      return (
        <ScheduleCard
          booking={booking}
          person={null}
          key={booking.id}
          deletePairing={deletePairingThunk}
        />
      );
    });
  };

  filterPaireeBookings = () => {
    const { schedule, user } = this.props;
    const bookings = schedule.filter(
      pairing => pairing.pairee !== null && pairing.pairee.name === user.name
    );
    return bookings.map(booking => {
      return (
        <ScheduleCard
          booking={booking}
          person={booking.pairer}
          key={booking.id}
        />
      );
    });
  };

  filterPairerBookings = () => {
    const { schedule, user } = this.props;
    const bookings = schedule.filter(
      pairing => pairing.pairee !== null && pairing.pairer.name === user.name
    );
    return bookings.map(booking => {
      return (
        <ScheduleCard
          booking={booking}
          person={booking.pairee}
          key={booking.id}
        />
      );
    });
  };

  render() {
    const { user } = this.props;
    return (
      <div className='Schedule'>
        <h2 className='Schedule-h2'>
          <span>{user.name}</span>, here is your pairing schedule{' '}
          <span role='img' aria-label='rocket ship emoji'>
            🚀
          </span>
        </h2>
        <div className='ScheduleCards--div'>
          <div>
            <h2>Giving help</h2>
            {this.filterPairerBookings()}
          </div>
          <div>
            <h2>Receiving help</h2>
            {this.filterPaireeBookings()}
          </div>
          <div>
            <h2>Open to pair</h2>
            {this.filterOpenings()}
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  schedule: state.schedule,
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  deletePairingThunk: id => dispatch(deletePairingThunk(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);

Schedule.propTypes = {
  deletePairingThunk: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  schedule: PropTypes.array,
  user: PropTypes.object,
};