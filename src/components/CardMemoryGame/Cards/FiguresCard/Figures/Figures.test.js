import React from 'react';
import { shallow } from 'enzyme';

import Figures from './Figures';
import { Row } from './Figures.components';

function getValueComponent(wrapper, index) {
  return wrapper
    .find(Row)
    .at(index)
    .children()
    .at(0); // Value component
}

describe('Testing Figures component', () => {
  test('renders correctly without props - used default values', () => {
    const wrapper = shallow(<Figures />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Row)).toHaveLength(3);

    expect(getValueComponent(wrapper, 0).text()).toMatch('0');
    expect(getValueComponent(wrapper, 1).text()).toMatch('0');
    expect(getValueComponent(wrapper, 2).text()).toMatch('0');
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

    expect(getValueComponent(wrapper, 0).text()).toMatch(`${props.won}`);
    expect(getValueComponent(wrapper, 1).text()).toMatch(`${props.lost}`);
    expect(getValueComponent(wrapper, 2).text()).toMatch(`${props.abandoned}`);
  });
});
