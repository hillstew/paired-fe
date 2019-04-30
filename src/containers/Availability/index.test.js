import React from 'react';
import { shallow } from 'enzyme';
import { Availability } from './index';

describe('Availability', () => {
  let wrapper;
  const mockProps = {
    handleClick: jest.fn(),
    availabilities: [
      true,
      false,
      true,
      false,
      true,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
      true,
      false,
      true
    ],
    match: {
      path: '/set-availability'
    }
  }

  beforeEach(() => {
    wrapper = shallow(<Availability {...mockProps} />);
  });

  it('should match the snapshot when the path is /set-availability', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when the path is /edit-availability', () => {
    wrapper = shallow(<Availability {...mockProps} match={{ path: '/edit-availability' }} />);    
    expect(wrapper).toMatchSnapshot();
  });
});
