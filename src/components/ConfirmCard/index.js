import React, { Component, Fragment } from 'react';
import { determineDisplayTime } from '../../helpers';
import PropTypes from 'prop-types';

export default class ConfirmCard extends Component {
  constructor() {
    super();
    this.state = {
      notes: ''
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push('/book-pairing');
  };

  handleConfirm = () => {
    const { notes } = this.state;
    const {
      confirmPairing,
      deletePairingThunk,
      hasOpeningAlready,
      selectedPairing,
      userId,
      history
    } = this.props;
    confirmPairing(selectedPairing, userId, notes);
    if (hasOpeningAlready) {
      const { pairingInConflictId } = this.props;
      deletePairingThunk(pairingInConflictId);
    }
    history.push('/schedule');
  };

  render() {
    const { date, time, name, hasOpeningAlready } = this.props;

    return (
      <div className='ConfirmCard'>
        <h3>Booking {name}:</h3>
        <p>
          {date} at {determineDisplayTime(time)}
        </p>
        <label htmlFor='notes'>Tell {name} what you'd like to pair on: </label>
        <input
          name='notes'
          value={this.state.notes}
          onChange={this.handleChange}
        />
        {hasOpeningAlready && (
          <Fragment>
            <p>
              Please note you have an opening on your availability for this date
              and time
            </p>
            <p>Click confirm to continue and your opening will be removed</p>
            <p>Or click cancel to choose a different pairing</p>
          </Fragment>
        )}
        <button
          className='ConfirmCard--button--confirm'
          onClick={this.handleConfirm}>
          Confirm Booking
        </button>
        <button
          className='ConfirmCard--button--cancel'
          onClick={this.handleCancel}>
          Cancel
        </button>
      </div>
    );
  }
}

ConfirmCard.propTypes = {
  confirmPairing: PropTypes.func,
  date: PropTypes.string,
  deletePairingThunk: PropTypes.func,
  hasOpeningAlready: PropTypes.bool,
  history: PropTypes.object,
  name: PropTypes.string,
  selectedPairing: PropTypes.string,
  time: PropTypes.string,
  userId: PropTypes.string
};
