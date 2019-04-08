import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './index';

describe('Sidebar', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper).toMatchSnapshot();
  });
});