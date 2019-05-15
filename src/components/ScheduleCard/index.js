import React, { Fragment } from 'react';
import { determineDisplayTime } from '../../helpers';
import PropTypes from 'prop-types';

export const ScheduleCard = ({ booking, person, deletePairing }) => {
  const { notes, time, date } = booking;
  return (
    <div className='ScheduleCard'>
      <p className='ScheduleCard--date'>{date}</p>
      <p className='ScheduleCard--time'>{determineDisplayTime(time)}</p>
      {person && (
        <Fragment>
          <h3 className='ScheduleCard--name'>{person.name}</h3>
          <p className='ScheduleCard--p'>Pronouns: {person.pronouns}</p>
          <p className='ScheduleCard--p'>Slack: {person.slack}</p>
          <p className='ScheduleCard--p'>
            Program: {person.program} Mod {person.module}
          </p>
          <p className='ScheduleCard--p'>Notes: {notes ? notes : 'no notes'}</p>
        </Fragment>
      )}
      {!person && (
        <button
          onClick={() => deletePairing(booking.id)}
          className='ScheduleCard--button'
        >
          Cancel
        </button>
      )}
    </div>
  );
};

ScheduleCard.propTypes = {
  booking: PropTypes.object,
  deletePairing: PropTypes.func,
  person: PropTypes.object
};
