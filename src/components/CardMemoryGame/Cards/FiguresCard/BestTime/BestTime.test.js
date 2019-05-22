import React from 'react';
import { shallow } from 'enzyme';

import BestTime, { DEFAULT_PLACEHOLDER } from './BestTime';
import { Row } from './BestTime.components';

describe('<BestTime />', () => {
  test('renders correctly without props - uses default placeholder', () => {
    const wrapper = shallow(<BestTime />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Row)).toHaveLength(3);

    wrapper.find(Row).forEach(node => {
      expect(
        node
          .children()
          .last()
          .text(),
      ).toMatch(DEFAULT_PLACEHOLDER);
    });
  });

  test('renders correctly with passed props', () => {
    const props = {
      casual: 10000,
      medium: 18000,
      hard: 27000,
    };

    const wrapper = shallow(<BestTime {...props} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Row)).toHaveLength(3);
  });
});
