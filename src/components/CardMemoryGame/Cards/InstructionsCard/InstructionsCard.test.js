import React from 'react';
import { shallow } from 'enzyme';

import InstructionsCard from './InstructionsCard';

describe('<InstructionsCard />', () => {
  const onCardClick = jest.fn();

  function setup(props) {
    const defaultProps = {
      name: 'I',
      isFlipped: false,
      onCardClick,
    };

    const wrapper = shallow(<InstructionsCard {...defaultProps} {...props} />);

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
    expect(wrapper.contains(<h2>Instructions</h2>)).toEqual(true);
  });

  test('should flip a card after a click', () => {
    const { wrapper, props } = setup();

    wrapper.simulate('click');
    expect(onCardClick).toHaveBeenCalledTimes(1);

    wrapper.setProps({ isFlipped: true });
    expect(wrapper.contains(<h2>Instructions</h2>)).toEqual(true);

    wrapper.simulate('click');
    expect(onCardClick).toHaveBeenCalledTimes(2);

    wrapper.setProps({ isFlipped: false });
    expect(wrapper.text()).toMatch(props.name);
  });
});
