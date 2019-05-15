import React from 'react';
import { shallow } from 'enzyme';

import { FiguresCard } from './FiguresCard';
import Figures from './Figures';
import BestTime from './BestTime';
import Flips from './Flips';

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
    expect(wrapper.text()).toMatch(props.name);
  });

  test('renders correctly flipped card', () => {
    props.isFlipped = true;

    const wrapper = shallow(<FiguresCard {...props} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Figures)).toBeDefined();
    expect(wrapper.find(BestTime)).toBeDefined();
    expect(wrapper.find(Flips)).toBeDefined();
  });

  test('should flip card after a click', () => {
    const wrapper = shallow(<FiguresCard {...props} />);

    wrapper.simulate('click');
    expect(props.onCardClick).toHaveBeenCalledTimes(1);
    wrapper.setProps({ isFlipped: true });
    expect(wrapper.find(Figures)).toBeDefined();
    expect(wrapper.find(BestTime)).toBeDefined();
    expect(wrapper.find(Flips)).toBeDefined();

    wrapper.simulate('click');
    expect(props.onCardClick).toHaveBeenCalledTimes(2);
    wrapper.setProps({ isFlipped: false });
    expect(wrapper.text()).toMatch(props.name);
  });
});