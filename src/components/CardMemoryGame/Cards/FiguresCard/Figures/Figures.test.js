import React from 'react';
import { shallow } from 'enzyme';

import Figures from './Figures';
import { Row } from './Figures.components';

describe('<Figures />', () => {
  test('renders correctly without props - uses default values', () => {
    const wrapper = shallow(<Figures />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Row)).toHaveLength(3);

    wrapper.find(Row).forEach(node => {
      expect(
        node
          .children()
          .first()
          .text(),
      ).toMatch('0');
    });
  });

  test('renders correctly with passed props', () => {
    const props = {
      won: 10,
      lost: 4,
      abandoned: 2,
    };

    const wrapper = shallow(<Figures {...props} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Row)).toHaveLength(3);
  });
});
