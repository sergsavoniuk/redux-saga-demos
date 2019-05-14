import React from 'react';
import { shallow } from 'enzyme';

import BestTime, { DEFAULT_PLACEHOLDER } from './BestTime';
import { Row } from './BestTime.components';

export function getValueComponent(wrapper, rowIndex) {
  return wrapper
    .find(Row)
    .at(rowIndex)
    .children()
    .at(1); // Value component
}

describe('Testing BestTime component', () => {
  test('renders correctly without props - used default placeholder', () => {
    const wrapper = shallow(<BestTime />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Row)).toHaveLength(3);

    expect(getValueComponent(wrapper, 0).text()).toMatch(DEFAULT_PLACEHOLDER);
    expect(getValueComponent(wrapper, 1).text()).toMatch(DEFAULT_PLACEHOLDER);
    expect(getValueComponent(wrapper, 2).text()).toMatch(DEFAULT_PLACEHOLDER);
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
