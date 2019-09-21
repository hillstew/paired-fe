import React from 'react';
import { formatDate, formatTime } from '../../helpers';

export const GroupCard = (props) => {
  const { 
    id,
    name,
    location,
    lead,
    coLead,
    category,
    attendees,
    agenda,
    date,
    time,
  } = props;

  return (
    <div className='GroupCard'>
      <h3 className='GroupCard--header'> {name} </h3>
      <p className='GroupCard--date'>{formatDate(date)}</p>
      <p className='GroupCard--time'>{formatTime(time)}</p>
      <p>Organizer: {lead}</p>
      <p>{coLead.length && `Co-organizer: ${coLead[0]}`}</p>
      <p>Location: {location}</p>
      <button className='GroupCard--button'>Attend {' '}
        <span role="img" aria-label="slightly smiling emoji">
         🙂 
        </span> 
      </button>
    </div>
  )
};