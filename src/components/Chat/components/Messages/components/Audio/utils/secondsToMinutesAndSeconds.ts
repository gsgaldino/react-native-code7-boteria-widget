export const secondsToMinutesAndSeconds = (seconds: number): string => {
  if (isNaN(seconds) || !seconds) return '0:00';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
};
