import React from 'react';
import { shallow, mount } from 'enzyme';

import Cards from './Cards';
import CardUtils from './utils';
import { Card } from './Cards.components';
import { CARDS } from 'constants/cardGame/cards';

const { Mock, Figures, Play, Instructions } = CARDS;

jest.mock('./utils', () => {
  return {
    isCardVisible: jest.fn(() => true),
  };
});

beforeEach(() => {
  jest.resetModules();
});

describe('<Cards />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<Cards />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Card')).toHaveLength(4);
  });

  test('should flip a Figures card after a click and make a Mock card invisible, and after a second click back to the initial state', () => {
    let flippedCard;
    const wrapper = shallow(<Cards />);

    CardUtils.isCardVisible = jest.fn().mockImplementation((cardName, _) => {
      if (cardName === Mock && flippedCard === Figures) {
        return false;
      }
      return true;
    });

    const figuresCard = wrapper
      .find('Card')
      .findWhere(node => node.prop('name') === Figures);
    flippedCard = Figures;
    figuresCard.prop('onCardClick')(Figures);

    expect(wrapper).toMatchSnapshot();

    flippedCard = null;
    figuresCard.prop('onCardClick')(Figures);
    expect(wrapper).toMatchSnapshot();
  });

  test.each`
    cardName | flippedCardName | expected
    ${Mock}  | ${Figures}      | ${false}
    ${Play}  | ${Instructions} | ${false}
    ${Play}  | ${Figures}      | ${true}
  `('test isCardVisible', ({ cardName, flippedCardName, expected }) => {
    const isCardVisible = jest.requireActual('./utils').isCardVisible;
    expect(isCardVisible(cardName, flippedCardName)).toBe(expected);
  });
});

describe('<Card /> styled component', () => {
  test('applies styles when flipped props set to true', () => {
    const wrapper = mount(<Card flipped={true} />);

    expect(wrapper).toHaveStyleRule('flex-direction', 'column');
    expect(wrapper).toHaveStyleRule('justify-content', 'flex-start');
    expect(wrapper).toHaveStyleRule('background-color', '#c0392b');
    expect(wrapper).toHaveStyleRule('font-weight', 'normal');
    expect(wrapper).toHaveStyleRule('opacity', '1', { modifier: ':hover' });
  });

  test('applies styles when fixed props set to true', () => {
    const wrapper = mount(<Card fixed={true} />);

    expect(wrapper).toHaveStyleRule('flex-direction', 'column');
    expect(wrapper).toHaveStyleRule('justify-content', 'space-around');
    expect(wrapper).toHaveStyleRule('background-color', '#c0392b');
    expect(wrapper).toHaveStyleRule('opacity', '1', { modifier: ':hover' });
  });

  test('applies styles when active props set to false', () => {
    const wrapper = mount(<Card active={false} />);

    expect(wrapper).toHaveStyleRule('transform', 'rotateY(180deg)');
    expect(wrapper).toHaveStyleRule('opacity', '1', {
      modifier: ':hover',
    });
  });
});
