import { placementType } from './index';

export const revesePlacement = (placement: placementType) => {
  switch (placement) {
    case 'bottom':
      return 'top';
    case 'top':
      return 'bottom';
    case 'right':
      return 'left';
    case 'left':
      return 'right';
  }
};
