import React from 'react';
import { shallow } from 'enzyme';

import { FiguresCard } from './FiguresCard';
import Figures from './Figures';
import BestTime from './BestTime';
import Flips from './Flips';

describe('<FiguresCard />', () => {
  const onCardClick = jest.fn();

  function setup(props) {
    const defaultProps = {
      name: 'F',
      isFlipped: false,
      statistics: {},
      onCardClick,
    };

    const wrapper = shallow(<FiguresCard {...defaultProps} {...props} />);

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
    expect(
      wrapper.containsAllMatchingElements([
        <Figures />,
        <BestTime />,
        <Flips />,
      ]),
    ).toEqual(true);
  });

  test('should flip a card after a click', () => {
    const { wrapper, props } = setup();

    wrapper.simulate('click');
    expect(onCardClick).toHaveBeenCalledTimes(1);

    wrapper.setProps({ isFlipped: true });
    expect(
      wrapper.containsAllMatchingElements([
        <Figures />,
        <BestTime />,
        <Flips />,
      ]),
    ).toEqual(true);

    wrapper.simulate('click');
    expect(onCardClick).toHaveBeenCalledTimes(2);

    wrapper.setProps({ isFlipped: false });
    expect(
      wrapper.containsAllMatchingElements([
        <Figures />,
        <BestTime />,
        <Flips />,
      ]),
    ).toEqual(false);
    expect(wrapper.text()).toMatch(props.name);
  });
});
