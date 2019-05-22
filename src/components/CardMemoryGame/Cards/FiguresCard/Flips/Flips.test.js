import React from 'react';
import { shallow } from 'enzyme';

import Flips from './Flips';
import { Row } from './Flips.components';

describe('<Flips />', () => {
  test('renders correctly without props - uses default values', () => {
    const wrapper = shallow(<Flips />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Row)).toHaveLength(3);

    wrapper.find(Row).forEach(node => {
      expect(
        node
          .children()
          .last()
          .text(),
      ).toMatch('0');
    });
  });

  test('renders correctly with passed props', () => {
    const props = {
      matched: 8,
      wrong: 12,
    };

    const wrapper = shallow(<Flips {...props} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Row)).toHaveLength(3);
  });
});
