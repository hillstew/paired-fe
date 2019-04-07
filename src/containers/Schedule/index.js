import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSchedule } from '../../actions';
import { CurrentOpenings } from '../../components/CurrentOpenings';
import { ScheduleCard } from '../../components/ScheduleCard';
import { deletePairingThunk } from '../../thunks/deletePairingThunk';

export class Schedule extends Component {
  getOpenings = () => {
    const { schedule } = this.props;
    return schedule.filter(pairing => pairing.pairee === null);
  };

  showPaireeBookings = () => {
    const { schedule, user } = this.props;
    const bookings = schedule.filter(
      pairing => pairing.pairee !== null && pairing.pairee.name === user.name
    );
    return bookings.map(booking => {
      return (
        <ScheduleCard
          booking={booking}
          type="pairee"
          cancelPairing={this.cancelPairing}
        />
      );
    });
  };

  showPairerBookings = () => {
    const { schedule, user } = this.props;
    const bookings = schedule.filter(
      pairing => pairing.pairee !== null && pairing.pairer.name === user.name
    );
    return bookings.map(booking => {
      return (
        <ScheduleCard
          booking={booking}
          type="pairer"
          cancelPairing={this.cancelPairing}
        />
      );
    });
  };

  cancelPairing = id => {
    const { deletePairingThunk } = this.props;
    deletePairingThunk(id);
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <CurrentOpenings openings={this.getOpenings()} user={user} />
        <div>
          {this.showPaireeBookings()}
          {this.showPairerBookings()}
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
  setSchedule: schedule => dispatch(setSchedule(schedule)),
  deletePairingThunk: id => dispatch(deletePairingThunk(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
