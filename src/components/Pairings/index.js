import React from 'react';
import StudentCard from '../../containers/StudentCard';

export const createStudents = openPairings => {
  return openPairings.reduce((acc, curr) => {
    let found = false;
    acc.forEach(student => {
      if (student.id === curr.pairer.id) {
        found = true;
        student[curr.time] = curr.id;
      }
    });

    if (!found) {
      let student = {
        ...curr.pairer,
        morning: '',
        lunch: '',
        afternoon: ''
      };
      student[curr.time] = curr.id;
      acc.push(student);
    }

    return acc;
  }, []);
};

export const Pairings = ({ openPairings, history }) => {
  const studentRows = createStudents(openPairings).map(student => {
    return <StudentCard student={student} key={student.id} history={history} />;
  });

  return <div className="Pairings">{studentRows}</div>;
};
