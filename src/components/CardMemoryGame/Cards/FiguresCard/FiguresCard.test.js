import React from 'react';
import { shallow } from 'enzyme';

import { FiguresCard } from './FiguresCard';

describe('Testing FiguresCard component', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'F',
      isFlipped: false,
      statistics: {},
      onCardClick: jest.fn(),
    };
  });

  test('renders correctly unflipped card', () => {
    const wrapper = shallow(<FiguresCard {...props} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.props().flipped).toBeUndefined();
    expect(wrapper.text()).toMatch(props.name);
  });

  test('renders correctly flipped card', () => {
    props.isFlipped = true;

    const wrapper = shallow(<FiguresCard {...props} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.props().flipped).toBe(true);
  });

  test('flips card after click', () => {
    const wrapper = shallow(<FiguresCard {...props} />);

    wrapper.simulate('click');
    expect(props.onCardClick).toHaveBeenCalledTimes(1);

    // wrapper.setProps({ isFlipped: true });
    // console.log(wrapper.props());
    // expect(wrapper).toMatchSnapshot();
  });
});
