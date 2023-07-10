import { getPlayedPercentage } from './getPlayedPercentage';

describe('getPlayedPercentage test suite', () => {
  it('should return 0 when currentTime is 0', () => {
    const duration = 100;
    const currentTime = 0;
    const result = getPlayedPercentage({ duration, currentTime });
    expect(result).toEqual(0);
  });

  it('should return 0.5 when currentTime is half of the duration', () => {
    const duration = 200;
    const currentTime = 100;
    const result = getPlayedPercentage({ duration, currentTime });
    expect(result).toEqual(0.5);
  });

  it('should return 1 when currentTime is equal to duration', () => {
    const duration = 300;
    const currentTime = 300;
    const result = getPlayedPercentage({ duration, currentTime });
    expect(result).toEqual(1);
  });

  it('should handle floating-point numbers correctly', () => {
    const duration = 100;
    const currentTime = 33.33;
    const result = getPlayedPercentage({ duration, currentTime });
    expect(result).toBeCloseTo(0.3333, 4);
  });
});
