import { describe, expect, it } from 'vitest';

import { type TabState, parse, serialize } from './chaoticSeeds';

const OFF: TabState = { enabled: false, max: 15, min: 4 };

describe('chaotic seeds state box', () => {
  it('writes "" when off and "min-max" when on', () => {
    expect(serialize(OFF)).toBe('');
    expect(serialize({ enabled: true, max: 12, min: 6 })).toBe('6-12');
    expect(serialize({ enabled: true, max: 3, min: 9 })).toBe('3-9');
  });

  it('reads a pasted range, ordered and clamped to 1..15 digits', () => {
    expect(parse('5-10', OFF)).toEqual({ enabled: true, max: 10, min: 5 });
    expect(parse(' 12 - 3 ', OFF)).toEqual({ enabled: true, max: 12, min: 3 });
    expect(parse('0-40', OFF)).toEqual({ enabled: true, max: 15, min: 1 });
  });

  it('turns off on anything else and keeps the range', () => {
    const on: TabState = { enabled: true, max: 9, min: 2 };
    expect(parse('', on)).toEqual({ ...on, enabled: false });
    expect(parse('abc', on)).toEqual({ ...on, enabled: false });
  });
});
