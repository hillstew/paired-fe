import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from './index';

describe('Profile', () => {
  describe('Profile component', () => {
    let wrapper;
    const mockProps = {
      createUser: jest.fn(),
      email: 'Hill@gmail.com',
      firebaseID: 'bAzN8PSfQSPL9rg4pMhTha8zewn2',
      image: 'https://avatars1.githubusercontent.com/u/49459620?v=4',
      name: 'Hillary'
    };

    beforeEach(() => {
      wrapper = shallow(<Profile {...mockProps} />);
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
