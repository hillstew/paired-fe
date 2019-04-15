import React from 'react';
import PropTypes from 'prop-types';

export const Availability = ({ handleClick, availabilities }) => {
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
              onClick={event => handleClick(event, i)}>
              {availability ? 'available' : 'unavailable'}
            </button>
          );
        })}
      </div>
    </section>
  );
};

Availability.propTypes = {
  availabilities: PropTypes.array,
  handleClick: PropTypes.func,
};