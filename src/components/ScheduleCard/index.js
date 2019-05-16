import React, { Fragment } from 'react';
import { determineDisplayTime, determineProgram } from '../../helpers';
import PropTypes from 'prop-types';

export const ScheduleCard = ({ booking, person, deletePairing }) => {
  const { notes, time, date, id } = booking;
  const { name, pronouns, slack, module, program } = person;
  return (
    <div className='ScheduleCard'>
      <p className='ScheduleCard--date'>{date}</p>
      <p className='ScheduleCard--time'>{determineDisplayTime(time)}</p>
      {person && (
        <Fragment>
          <h3 className='ScheduleCard--name'>{name}</h3>
          <p className='ScheduleCard--p'>Pronouns: {pronouns}</p>
          <p className='ScheduleCard--p'>Slack: {slack}</p>
          <p className='ScheduleCard--p'>
            Program: {determineProgram(program, module)}
          </p>
          <p className='ScheduleCard--p'>Notes: {notes ? notes : 'no notes'}</p>
        </Fragment>
      )}
      {!person && (
        <button
          onClick={() => deletePairing(id)}
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
