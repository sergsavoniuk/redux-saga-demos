import React from 'react';
import { shallow } from 'enzyme';

import { LevelButton } from './LevelButton';
import { LEVELS } from 'constants/cardGame/levels';

const { Casual, Medium } = LEVELS;

describe('Testing LevelButton component', () => {
  let props;

  beforeEach(() => {
    props = {
      level: Casual,
      chooseLevel: jest.fn(),
    };
  });

  test('renders correctly', () => {
    const wrapper = shallow(<LevelButton {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('should change a game level after a click', () => {
    const wrapper = shallow(<LevelButton {...props} />);

    expect(wrapper.text()).toMatch(Casual);

    wrapper.simulate('click');
    wrapper.setProps({ level: Medium });

    expect(props.chooseLevel).toHaveBeenCalled();
    expect(wrapper.text()).toMatch(Medium);
    expect(wrapper).toMatchSnapshot();
  });
});
