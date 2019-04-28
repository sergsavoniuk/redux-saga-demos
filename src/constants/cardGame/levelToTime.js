import { LEVELS } from 'constants/cardGame/levels';

const { Casual, Medium, Hard } = LEVELS;

export const LEVEL_TO_TIME = {
  [Casual]: 32000,
  [Medium]: 90000,
  [Hard]: 192000,
};
