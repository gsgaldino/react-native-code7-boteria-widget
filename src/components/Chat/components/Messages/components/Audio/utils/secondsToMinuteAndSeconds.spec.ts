import { secondsToMinutesAndSeconds } from './secondsToMinutesAndSeconds';

describe('secondsToMinutesAndSeconds test suite', () => {
  it('should return "0:00" when seconds is NaN', () => {
    const seconds = NaN;
    const result = secondsToMinutesAndSeconds(seconds);
    expect(result).toEqual('0:00');
  });

  it('should return "0:00" when seconds is falsy', () => {
    const seconds = 0;
    const result = secondsToMinutesAndSeconds(seconds);
    expect(result).toEqual('0:00');
  });

  it('should return the correct minutes and seconds when seconds are less than 60', () => {
    const seconds = 45;
    const result = secondsToMinutesAndSeconds(seconds);
    expect(result).toEqual('0:45');
  });

  it('should return the correct minutes and seconds when seconds are exactly 60', () => {
    const seconds = 60;
    const result = secondsToMinutesAndSeconds(seconds);
    expect(result).toEqual('1:00');
  });

  it('should return the correct minutes and seconds when seconds are greater than 60', () => {
    const seconds = 125;
    const result = secondsToMinutesAndSeconds(seconds);
    expect(result).toEqual('2:05');
  });

  it('should handle floating-point numbers correctly', () => {
    const seconds = 72.5;
    const result = secondsToMinutesAndSeconds(seconds);
    expect(result).toEqual('1:12');
  });
});
