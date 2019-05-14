import React from 'react';
import { shallow } from 'enzyme';

import Flips from './Flips';
import { Row } from './Flips.components';
import { getValueComponent } from '../BestTime/BestTime.test';

describe('Testing Flips component', () => {
  test('renders correctly without props - used default values', () => {
    const wrapper = shallow(<Flips />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Row)).toHaveLength(3);

    expect(getValueComponent(wrapper, 0).text()).toMatch('0');
    expect(getValueComponent(wrapper, 1).text()).toMatch('0');
    expect(getValueComponent(wrapper, 2).text()).toMatch('0');
  });

  test('renders correctly with passed props', () => {
    const props = {
      matched: 8,
      wrong: 12,
    };

    const wrapper = shallow(<Flips {...props} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Row)).toHaveLength(3);

    expect(getValueComponent(wrapper, 0).text()).toMatch(
      `${2 * (props.matched + props.wrong)}`,
    );
    expect(getValueComponent(wrapper, 1).text()).toMatch(`${props.matched}`);
    expect(getValueComponent(wrapper, 2).text()).toMatch(`${props.wrong}`);
  });
});
