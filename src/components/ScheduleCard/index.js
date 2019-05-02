import React, { Fragment } from 'react';
import { determineDisplayTime } from '../../helpers';
import PropTypes from 'prop-types';

export const ScheduleCard = ({ booking, person, deletePairing }) => {
  const { notes, time, date } = booking;
  return (
    <div className='ScheduleCard'>
      <p className='ScheduleCard--date'>
        {date} at {determineDisplayTime(time)}
      </p>
      {person && (
        <Fragment>
          <h3>{person.name}</h3>
          <p>Pronouns: {person.pronouns}</p>
          <p>Slack: {person.slack}</p>
          <p>
            Program: {person.program} Mod {person.module}
          </p>
          <p>Notes: {notes ? notes : 'no notes'}</p>
        </Fragment>
      )}
      {!person && (
        <button onClick={() => deletePairing(booking.id)}>Cancel</button>
      )}
    </div>
  );
};

ScheduleCard.propTypes = {
  booking: PropTypes.object,
  deletePairing: PropTypes.func,
  person: PropTypes.object
};
