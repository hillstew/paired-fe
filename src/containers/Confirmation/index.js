import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfirmCard from '../../components/ConfirmCard';
import { ConflictCard } from '../../components/ConflictCard';
import { confirmPairing } from '../../thunks/confirmPairing';
import { deletePairingThunk } from '../../thunks/deletePairingThunk';
import PropTypes from 'prop-types';

export class Confirmation extends Component {
  constructor() {
    super();
    this.state = {
      pairingInConflict: null,
      date: '',
      time: '',
      name: ''
    };
  }

  componentDidMount = () => {
    const { availPairings, selectedPairing, schedule } = this.props;

    const {
      date,
      time,
      pairer: { name }
    } = availPairings.find(pairing => pairing.id === selectedPairing);

    const pairingInConflict = schedule.find(pairing => {
      return pairing.date === date && pairing.time === time;
    });

    this.setState({ pairingInConflict, date, time, name });
  };
  
  determineConflict = () => {
    const { pairee, id } = this.state.pairingInConflict;
    const { date, time, name } = this.state;
    const { selectedPairing, history, user, confirmPairing, deletePairingThunk } = this.props;
    if (pairee === null) {
      return (
        <ConfirmCard
          date={date}
          time={time}
          name={name}
          selectedPairing={selectedPairing}
          hasOpeningAlready={true}
          history={history}
          confirmPairing={confirmPairing}
          deletePairingThunk={deletePairingThunk}
          userId={user.id}
          pairingInConflictId={id}
        />
      );
    }

    return <ConflictCard date={date} time={time} history={history}/>;
  };

  render() {
    const { pairingInConflict, date, time, name } = this.state;
    const {
      selectedPairing,
      history,
      user,
      confirmPairing,
      deletePairingThunk
    } = this.props;

    return (
      <section className='Confirmation'>
        {pairingInConflict && this.determineConflict()}
        {!pairingInConflict && (
          <ConfirmCard
            date={date}
            time={time}
            name={name}
            selectedPairing={selectedPairing}
            hasOpeningAlready={false}
            history={history}
            confirmPairing={confirmPairing}
            deletePairingThunk={deletePairingThunk}
            userId={user.id}
          />
        )}
      </section>
    );
  }
}

export const mapStateToProps = state => ({
  selectedPairing: state.selectedPairing,
  availPairings: state.availPairings,
  schedule: state.schedule,
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  confirmPairing: (pairingId, paireeId, notes) =>
    dispatch(confirmPairing(pairingId, paireeId, notes)),
  deletePairingThunk: pairingId => dispatch(deletePairingThunk(pairingId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);

Confirmation.propTypes = {
  availPairings: PropTypes.array,
  confirmPairing: PropTypes.func,
  deletePairingThunk: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  schedule: PropTypes.array,
  selectedPairing: PropTypes.string,
  user: PropTypes.object,
};