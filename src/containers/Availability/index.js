import React, { Component } from 'react';
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
      await setAvailability(user.id, availabilities);
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

  renderButton = (availability, i) => {
    const { windowInnerWidth } = this.props;
    const buttonText =
      windowInnerWidth > 560 ? ['available', 'unavailable'] : ['✓', ''];
    return (
      <button
        key={i}
        className={'button--availability button--' + availability}
        onClick={event => this.handleClick(event, i)}
      >
        {availability ? buttonText[0] : buttonText[1]}
      </button>
    );
  };

  render() {
    const { availabilities } = this.state;
    const { match, windowInnerWidth } = this.props;
    const { path } = match;
    const rowNames =
      windowInnerWidth > 560
        ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    return (
      <section className='Availability'>
        <h2 className='Availability--h2'>
          When are you available to help to others?
        </h2>
        <table className='Availability--table'>
          <thead>
            <tr>
              <th />
              <th>8:00 - 8:50 a.m.</th>
              <th>12:00 - 12:50 p.m.</th>
              <th>4:10 - 5:00 p.m.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='row-name'>{rowNames[0]}</td>
              <td>{this.renderButton(availabilities[0], 0)}</td>
              <td>{this.renderButton(availabilities[1], 1)}</td>
              <td>{this.renderButton(availabilities[2], 2)}</td>
            </tr>
            <tr>
              <td className='row-name'>{rowNames[1]}</td>
              <td>{this.renderButton(availabilities[3], 3)}</td>
              <td>{this.renderButton(availabilities[4], 4)}</td>
              <td>{this.renderButton(availabilities[5], 5)}</td>
            </tr>
            <tr>
              <td className='row-name'>{rowNames[2]}</td>
              <td>{this.renderButton(availabilities[6], 6)}</td>
              <td>{this.renderButton(availabilities[7], 7)}</td>
              <td>{this.renderButton(availabilities[8], 8)}</td>
            </tr>
            <tr>
              <td className='row-name'>{rowNames[3]}</td>
              <td>{this.renderButton(availabilities[9], 9)}</td>
              <td>{this.renderButton(availabilities[10], 10)}</td>
              <td>{this.renderButton(availabilities[11], 11)}</td>
            </tr>
            <tr>
              <td className='row-name'>{rowNames[4]}</td>
              <td>{this.renderButton(availabilities[12], 12)}</td>
              <td>{this.renderButton(availabilities[13], 13)}</td>
              <td>{this.renderButton(availabilities[14], 14)}</td>
            </tr>
          </tbody>
        </table>
        {path === '/set-availability' && (
          <div className='Availability--div-buttons'>
            <button onClick={this.setAvailability} id='skip--button'>
              Skip
            </button>
            <button onClick={this.setAvailability} id='set--button'>
              Set Availability
            </button>
          </div>
        )}
        {path === '/edit-availability' && (
          <div className='Availability--div-buttons'>
            <button onClick={this.editAvailability} id='cancel--button'>
              Cancel
            </button>
            <button onClick={this.editAvailability} id='edit--button'>
              Edit Availability
            </button>
          </div>
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
  setAvailability: PropTypes.func,
  windowInnerWidth: PropTypes.number
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Availability)
);
