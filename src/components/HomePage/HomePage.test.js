import React from 'react';
import { shallow } from 'enzyme';

import { HomePage } from './HomePage';
import { Greeting } from './HomePage.components';

describe('<HomePage />', () => {
  test('renders correctly with passed props', () => {
    const props = {
      username: 'anonymous',
    };
    const wrapper = shallow(<HomePage {...props} />);

    expect(wrapper.find(Greeting)).toHaveLength(1);
    expect(wrapper.find(Greeting).text()).toMatch(props.username);
    expect(wrapper.find('AppCard')).toHaveLength(1);
  });
});
