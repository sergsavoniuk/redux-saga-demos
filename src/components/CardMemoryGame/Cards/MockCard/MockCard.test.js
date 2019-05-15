import React from 'react';
import { shallow } from 'enzyme';

import MockCard from './MockCard';

describe('Testing MockCard component', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<MockCard name="M" />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.props().active).toBe(false);
  });
});
