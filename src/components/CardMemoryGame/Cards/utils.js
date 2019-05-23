import { CARDS } from 'constants/cardGame/cards';

const { Mock, Figures, Play, Instructions } = CARDS;

function isCardVisible(cardName, flippedCard) {
  if (
    (cardName === Mock && flippedCard === Figures) ||
    (cardName === Play && flippedCard === Instructions)
  ) {
    return false;
  }
  return true;
}

export { isCardVisible };
