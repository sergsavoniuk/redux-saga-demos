import React from 'react';
import { shallow } from 'enzyme';

import { LevelButton } from './LevelButton';
import { LEVELS } from 'constants/cardGame/levels';

const { Casual, Medium } = LEVELS;

describe('<LevelButton />', () => {
  const chooseLevel = jest.fn();

  function setup() {
    const props = {
      level: Casual,
      chooseLevel,
    };

    const wrapper = shallow(<LevelButton {...props} />);

    return {
      wrapper,
    };
  }

  afterEach(() => {
    chooseLevel.mockClear();
  });

  test('renders correctly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  test.skip('should change a game level after a click', () => {
    const { wrapper } = setup();

    expect(wrapper.text()).toMatch(Casual);

    wrapper.simulate('click');
    wrapper.setProps({ level: Medium });

    expect(chooseLevel).toHaveBeenCalled();
  });
});
