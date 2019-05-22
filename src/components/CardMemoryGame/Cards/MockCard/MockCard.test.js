import React from 'react';
import { shallow } from 'enzyme';

import MockCard from './MockCard';

describe('<MockCard />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<MockCard name="M" />);

    expect(wrapper).toMatchSnapshot();
  });
});
