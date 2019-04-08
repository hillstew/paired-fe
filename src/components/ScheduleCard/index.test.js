import React from 'react';
import { shallow } from 'enzyme';
import { ScheduleCard } from './index';
import * as data from '../../mockData';

describe('ScheduleCard', () => {
  const mockBooking = data.mockAvailPairings[0];
  const mockPerson = data.mockAvailPairings[0].pairer;
  const mockBookingWithNotes = {
    ...data.mockAvailPairings[0],
    notes: 'Help with JSFun problemset'
  };
  it('should match the snapshot when there are no notes', () => {
    const wrapper = shallow(
      <ScheduleCard booking={mockBooking} person={mockPerson} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when there are notes', () => {
    const wrapper = shallow(
      <ScheduleCard booking={mockBookingWithNotes} person={mockPerson} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});;