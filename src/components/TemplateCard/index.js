import React from 'react';
import PropTypes from 'prop-types';

export const TemplateCard = ({ type }) => {
  let message;
  switch (type) {
    case 'giving-help':
      message = (
        <p>
          You haven't been booked yet. Check back soon. {' '}
          <span role="img" aria-label="smiley emoji">
            🙂
          </span>
        </p>
      );
      break;
    case 'receiving-help':
      message = (
        <p>
          Sign up to pair. Coding is better with friends. {' '}
          <span role="img" aria-label="100 emoji">
            💯
          </span>
        </p>
      );
      break;
    case 'openings':
      message = (
        <p>
          You have no openings. {' '}
          <span role="img" aria-label="crying emoji">
            😭
          </span>
        </p>
      );
      break;
    default:
      break;
  }
  return <div className="ScheduleCard">{message}</div>;
};

TemplateCard.propTypes = {
  type: PropTypes.string
};
