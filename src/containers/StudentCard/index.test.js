import React from 'react';
import { shallow } from 'enzyme';
import { StudentCard, mapDispatchToProps } from './index';
import {
  mockStudentForStudentCard,
  mockStudForStudentCardNoAvail,
  mockStudForStudentCardAllAvail
} from '../../mockData';
import { setPairingId } from '../../actions';

describe('StudentCard', () => {
  describe('StudentCard component', () => {
    let wrapper;
    const mockSetPairingId = jest.fn();
    const mockPropsAllTimesAvail = mockStudForStudentCardAllAvail;
    const mockPropsNoTimes = mockStudForStudentCardNoAvail;
    beforeEach(() => {
      wrapper = shallow(
        <StudentCard
          student={mockStudentForStudentCard}
          setPairingId={mockSetPairingId}
        />
      );
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when the student has all times available', () => {
      wrapper = shallow(
        <StudentCard
          student={mockPropsAllTimesAvail}
          setPairingId={mockSetPairingId}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

        it('should match the snapshot when the student has no available times', () => {
          wrapper = shallow(
            <StudentCard
              student={mockPropsNoTimes}
              setPairingId={mockSetPairingId}
            />
          );
          expect(wrapper).toMatchSnapshot();
        });
  });

  describe('mapDispatchToProps', () => {

  });
});
