import React from 'react';
import { determineDisplayTime } from '../../helpers';
import PropTypes from 'prop-types';

export const ConflictCard = ({ date, time, history }) => {
  return (
    <div className='ConfirmCard'>
      <h3>
        Sorry, you have a conflict{' '}
        <span role='img' aria-label='grimacing emoji'>
          😬
        </span>
      </h3>
      <p>
        You already have a pairing scheduled for {date} from{' '}
        {determineDisplayTime(time)}
      </p>
      <p>
        Please go back and choose a different date/time or adjust your schedule
      </p>
      <button
        className='ConflictCard--button'
        onClick={() => history.push('/book-pairing')}>
        Choose Another Pairing
      </button>
      <button
        className='ConflictCard--button--schedule'
        onClick={() => history.push('/schedule')}>
        View Schedule
      </button>
    </div>
  );
};

ConflictCard.propTypes = {
  date: PropTypes.string,
  history: PropTypes.object,
  time: PropTypes.string
};
