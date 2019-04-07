import React from 'react';

export const CurrentOpenings = ({ openings, user: { name } }) => {
  return (
    <div>
      <h4>You have the following openings, {name}</h4>
      <ul>
        {openings.map(opening => (
          <li>
            {opening.date}, {opening.time === 'morning' && '8:00 - 8:50 a.m.'}
            {opening.time === 'lunch' && '12:00 - 12:50 p.m.'}
            {opening.time === 'afternoon' && '4:00 - 4:50 p.m.'}
          </li>
        ))}
      </ul>
    </div>
  );
};
