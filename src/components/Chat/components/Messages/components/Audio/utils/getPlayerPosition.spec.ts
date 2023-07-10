import { getPlayedPosition } from './getPlayerPosition';

describe('getPlayedPosition test suite', () => {
  it('should return 0 when playedPercentage is 0', () => {
    const duration = 100;
    const playedPercentage = 0;
    const result = getPlayedPosition({ duration, playedPercentage });
    expect(result).toEqual(0);
  });

  it('should return the correct position when playedPercentage is less than 1', () => {
    const duration = 200;
    const playedPercentage = 0.5;
    const result = getPlayedPosition({ duration, playedPercentage });
    expect(result).toEqual(100);
  });

  it('should return the correct position when playedPercentage is equal to 1', () => {
    const duration = 300;
    const playedPercentage = 1;
    const result = getPlayedPosition({ duration, playedPercentage });
    expect(result).toEqual(300);
  });

  it('should handle floating-point numbers correctly', () => {
    const duration = 100;
    const playedPercentage = 0.3333;
    const result = getPlayedPosition({ duration, playedPercentage });
    expect(result).toBeCloseTo(33.33, 2);
  });
});
