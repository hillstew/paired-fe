import React from 'react';
import { shallow } from 'enzyme';
import { TemplateCard } from './index';

describe('TemplateCard', () => {
  it('should match the snapshot when type is giving-help', () => {
    const wrapper = shallow(<TemplateCard type='giving-help' />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should match the snapshot when type is receiving-help', () => {
    const wrapper = shallow(<TemplateCard type='receiving-help' />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should match the snapshot when type is openings', () => {
    const wrapper = shallow(<TemplateCard type='openings' />);
    expect(wrapper).toMatchSnapshot();
  });
});