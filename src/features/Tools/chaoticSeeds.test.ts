import { describe, expect, it } from 'vitest';

import { MAX_DIGITS, rollChaoticSeed } from './chaoticSeeds';

const digitsOf = (n: number) => String(n).length;

describe('rollChaoticSeed', () => {
  it('stays within the digit range', () => {
    for (let i = 0; i < 2000; i++) {
      const seed = rollChaoticSeed(4, 15);
      expect(Number.isSafeInteger(seed)).toBe(true);
      expect(digitsOf(seed)).toBeGreaterThanOrEqual(4);
      expect(digitsOf(seed)).toBeLessThanOrEqual(15);
    }
  });

  it('takes the ends of the range from the random source', () => {
    expect(rollChaoticSeed(4, 15, () => 0)).toBe(1000);
    expect(rollChaoticSeed(4, 15, () => 0.999_999_999_999_999_9)).toBe(999_999_999_999_999);
    expect(rollChaoticSeed(1, 1, () => 0)).toBe(0);
  });

  it('swaps a min above the max and clamps to 1..15 digits', () => {
    expect(digitsOf(rollChaoticSeed(9, 3, () => 0))).toBe(3);
    expect(digitsOf(rollChaoticSeed(30, 30))).toBe(MAX_DIGITS);
    expect(digitsOf(rollChaoticSeed(-5, 0, () => 0.5))).toBe(1);
  });
});
