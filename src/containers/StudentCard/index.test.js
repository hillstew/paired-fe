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
    const mockHistory = { push: jest.fn() };
    beforeEach(() => {
      wrapper = shallow(
        <StudentCard
          student={mockPropsAllTimesAvail}
          setPairingId={mockSetPairingId}
          history={mockHistory}
        />
      );
    });

    it('should match the snapshot when the student has all times available', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when the student has some times available', () => {
      wrapper = shallow(
        <StudentCard
          student={mockStudentForStudentCard}
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

    it('should call handleClick when the Book It button for morning is clicked', () => {
      const expectedId = mockStudForStudentCardAllAvail.morning;
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleClick');
      wrapper.find('#morning').simulate('click');
      expect(instance.handleClick).toHaveBeenCalledWith(expectedId); 
    });

    it('should call handleClick when the Book It button for lunch is clicked', () => {
      const expectedId = mockStudForStudentCardAllAvail.lunch;
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleClick');
      wrapper.find('#lunch').simulate('click');
      expect(instance.handleClick).toHaveBeenCalledWith(expectedId);
    });

    it('should call handleClick when the Book It button for afternoon is clicked', () => {
      const expectedId = mockStudForStudentCardAllAvail.afternoon;
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleClick');
      wrapper.find('#afternoon').simulate('click');
      expect(instance.handleClick).toHaveBeenCalledWith(expectedId);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with setPairingId when setPairingId is called', () => {
      const mockDispatch = jest.fn();
      const mockId = '4wkljf';
      const actionToDispatch = setPairingId(mockId);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setPairingId(mockId);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
