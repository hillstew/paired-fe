import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../../thunks/createUser';
import { deleteAvailability } from '../../thunks/deleteAvailability';
import { setAvailability } from '../../thunks/setAvailability';

export class Availability extends Component {
  state = {
    availabilities: Array(15).fill(false)
  };

  editAvailability = async event => {
    const { id } = event.target;
    const { deleteAvailability, setAvailability, history } = this.props;
    const { user } = this.props.location.state;
    const { availabilities } = this.state;
    if (id === 'edit--button') {
      await deleteAvailability(user.id);
      setAvailability(user.id, availabilities);
    }
    history.push('/schedule');
  };

  handleClick = (event, i) => {
    event.preventDefault();
    const { availabilities } = this.state;
    const newAvailabilities = availabilities.map((availability, j) => {
      return i === j ? !availability : availability;
    });
    this.setState({ availabilities: newAvailabilities });
  };

  setAvailability = event => {
    const { id } = event.target;
    const { createUser, history } = this.props;
    const { user } = this.props.location.state;
    const { availabilities } = this.state;
    if (id === 'set--button') {
      createUser(user, availabilities);
    } else {
      createUser(user);
    }
    history.push('/');
  };

  render() {
    const { availabilities } = this.state;
    const { path } = this.props.match;
    return (
      <section className='Availability'>
        <h3>Please set when you are available to give help to others</h3>
        <ul className='day--container'>
          <li />
          <li>Monday</li>
          <li>Tuesday</li>
          <li>Wednesday</li>
          <li>Thursday</li>
          <li>Friday</li>
        </ul>
        <div className='button--container'>
          <span>morning</span>
          <span>lunch</span>
          <span>afternoon</span>
          {availabilities.map((availability, i) => {
            return (
              <button
                key={i}
                className={'button--' + availability}
                onClick={event => this.handleClick(event, i)}
              >
                {availability ? 'available' : 'unavailable'}
              </button>
            );
          })}
        </div>
        {path === '/set-availability' && (
          <Fragment>
            <button onClick={this.setAvailability} id='set--button'>
              Set Availability
            </button>
            <button onClick={this.setAvailability} id='skip--button'>
              Skip
            </button>
          </Fragment>
        )}
        {path === '/edit-availability' && (
          <Fragment>
            <button onClick={this.editAvailability} id='edit--button'>
              Edit Availability
            </button>
            <button onClick={this.editAvailability} id='cancel--button'>
              Cancel
            </button>
          </Fragment>
        )}
      </section>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  createUser: (user, availabilities) =>
    dispatch(createUser(user, availabilities)),
  deleteAvailability: userId => dispatch(deleteAvailability(userId)),
  setAvailability: (userId, availabilities) =>
    dispatch(setAvailability(userId, availabilities))
});

Availability.propTypes = {
  handleClick: PropTypes.func,
  createUser: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  deleteAvailability: PropTypes.func,
  setAvailability: PropTypes.func
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Availability)
);
