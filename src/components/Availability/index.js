import React from 'react';

export const Availability = ({ handleClick, availabilities }) => {
  return (
    <section className='Availability'>
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
              onClick={(event) => handleClick(event, i)}>
              {availability ? 'available' : 'unavailable'}
            </button>
          );
        })}
      </div>
    </section>
  );
};