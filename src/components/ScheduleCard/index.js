import React, { Fragment } from 'react';
import { determineDisplayTime } from '../../helpers';
import PropTypes from 'prop-types';

export const ScheduleCard = ({ booking, person, deletePairing }) => {
  const { notes, time, date } = booking;
  return (
    <div className="ScheduleCard">
      {person && (
        <Fragment>
          <h3>{person.name}</h3>
          <p>{person.pronouns}</p>
          <p>
            {person.program} Mod {person.module}
          </p>
          <p>Notes: {notes ? notes : `${person.slack} on Slack`}</p>
        </Fragment>
      )}
      <p>
        {date} at {determineDisplayTime(time)}
      </p>
      {!person && (
        <button onClick={() => deletePairing(booking.id)}>
          Cancel
        </button>
      )}
    </div>
  );
};

ScheduleCard.propTypes = {
  booking: PropTypes.object,
  deletePairing: PropTypes.func,
  person: PropTypes.object,
};