import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../../thunks/createUser';

export class Availability extends Component {
  state = {
    availabilities: Array(15).fill(false)
  };

  handleClick = (event, i) => {
    event.preventDefault();
    const { availabilities } = this.state;
    const newAvailabilities = availabilities.map((availability, j) => {
      return i === j ? !availability : availability;
    });
    this.setState({ availabilities: newAvailabilities });
  };

  handleSubmit = (event) => {
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
                onClick={event => this.handleClick(event, i)}>
                {availability ? 'available' : 'unavailable'}
              </button>
            );
          })}
        </div>
        <button onClick={this.handleSubmit} id="set--button">Set Availability</button>
        <button onClick={this.handleSubmit} id="skip--button">Skip</button>
      </section>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  createUser: (user, availabilities) =>
    dispatch(createUser(user, availabilities))
});

Availability.propTypes = {
  availabilities: PropTypes.array,
  handleClick: PropTypes.func,
  createUser: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Availability)
);
