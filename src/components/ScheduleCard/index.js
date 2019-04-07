import React from 'react';

export const ScheduleCard = ({ booking, type, cancelPairing }) => {
  const { notes, pairee, pairer, time, date } = booking;
  return (
    <div className={type === 'pairer' ? 'pairer' : 'pairee'}>
      <p>{date}</p>
      {time === 'morning' && <p>8:00 - 8:50 a.m.</p>}
      {time === 'lunch' && <p>12:00 - 12:50 p.m.</p>}
      {time === 'afternoon' && <p>4:00 - 4:50 p.m.</p>}
      {type === 'pairer' && (
        <p>
          {pairee.name} from {pairee.program} Mod {pairee.module} signed up to
          pair with you.
        </p>
      )}
      {type === 'pairee' && <p>You signed up to pair with {pairer.name}.</p>}
      {type === 'pairer' && (
        <p>
          Notes: {notes ? notes : `${pairee.slack} on Slack for further info`}
        </p>
      )}
      <button onClick={() => cancelPairing(booking.id)}>
        Cancel this pairing
      </button>
    </div>
  );
};
