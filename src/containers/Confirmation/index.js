import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfirmCard from '../../components/ConfirmCard';
import { ConflictCard } from '../../components/ConflictCard';
import { confirmPairing } from '../../thunks/confirmPairing';
import { deletePairingThunk } from '../../thunks/deletePairingThunk';
import PropTypes from 'prop-types';
import * as gql from '../../queries';
import { fetchData } from '../../utils';
import { Redirect } from 'react-router-dom';
import { setError } from '../../actions';

export class Confirmation extends Component {
  constructor() {
    super();
    this.state = {
      pairingInConflict: null,
      date: '',
      time: '',
      name: '',
      pairingIsAvailable: true
    };
  }

  componentDidMount() {
    this.getPairing();
  };

  getPairing = async () => {
    const { schedule } = this.props;
    const { id } = this.props.match.params;
    try {
      const body = gql.getPairing(id);
      const response = await fetchData(body);
      if (response.getPairing.pairee === null) {
        const { date, time, pairer: { name } } = response.getPairing;
        const pairingInConflict = schedule.find(pairing => {
          return pairing.date === date && pairing.time === time;
        });
        this.setState({ pairingInConflict, date, time, name });
      }
    } catch (error) {
      this.setState({ pairingIsAvailable: false });
      this.props.setError(error.message);
    }
  }

  determineConflict = () => {
    const { pairee, id } = this.state.pairingInConflict;
    const { date, time, name } = this.state;
    const {
      history,
      user,
      confirmPairing,
      deletePairingThunk,
      match
    } = this.props;
    if (pairee === null) {
      return (
        <ConfirmCard
          date={date}
          time={time}
          name={name}
          selectedPairing={match.params.id}
          hasOpeningAlready={true}
          history={history}
          confirmPairing={confirmPairing}
          deletePairingThunk={deletePairingThunk}
          userId={user.id}
          pairingInConflictId={id}
        />
      );
    }
    return <ConflictCard date={date} time={time} history={history} />;
  };

  render() {
    const {
      pairingInConflict,
      date,
      time,
      name,
      pairingIsAvailable
    } = this.state;
    const {
      history,
      user,
      confirmPairing,
      deletePairingThunk,
      match
    } = this.props;
    return (
      <section className='Confirmation'>
        {pairingIsAvailable && pairingInConflict && this.determineConflict()}
        {pairingIsAvailable && !pairingInConflict && (
          <ConfirmCard
            date={date}
            time={time}
            name={name}
            selectedPairing={match.params.id}
            hasOpeningAlready={false}
            history={history}
            confirmPairing={confirmPairing}
            deletePairingThunk={deletePairingThunk}
            userId={user.id}
          />
        )}
        {!pairingIsAvailable && (
          <Redirect to='/book-pairing' />
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
  deletePairingThunk: pairingId => dispatch(deletePairingThunk(pairingId)),
  setError: error => dispatch(setError(error))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirmation);

Confirmation.propTypes = {
  availPairings: PropTypes.array,
  confirmPairing: PropTypes.func,
  deletePairingThunk: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  schedule: PropTypes.array,
  user: PropTypes.object
};
