import React from 'react';
import { shallow } from 'enzyme';

import PlayCard from './PlayCard';
import LevelButton from './LevelButton';

describe('<PlayCard />', () => {
  const onCardClick = jest.fn();

  function setup(props) {
    const defaultProps = {
      name: 'P',
      isFlipped: false,
      onCardClick,
    };

    const wrapper = shallow(<PlayCard {...defaultProps} {...props} />);

    return {
      wrapper,
      props: defaultProps,
    };
  }

  afterEach(() => {
    onCardClick.mockClear();
  });

  test('renders correctly unflipped card', () => {
    const { wrapper, props } = setup();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.text()).toMatch(props.name);
  });

  test('renders correctly flipped card', () => {
    const { wrapper } = setup({ isFlipped: true });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(LevelButton)).toHaveLength(3);
  });

  test('should flip a card after a click', () => {
    const { wrapper, props } = setup();

    expect(wrapper.text()).toMatch(props.name);

    wrapper.simulate('click');
    expect(onCardClick).toHaveBeenCalledTimes(1);

    wrapper.setProps({ isFlipped: true });
    expect(wrapper.find(LevelButton)).toHaveLength(3);

    wrapper.simulate('click');
    expect(onCardClick).toHaveBeenCalledTimes(2);

    wrapper.setProps({ isFlipped: false });
    expect(wrapper.text()).toMatch(props.name);
  });
});
