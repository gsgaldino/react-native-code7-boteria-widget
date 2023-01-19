export const secondsToMinutesAndSeconds = (seconds: number): string => {
  if (isNaN(seconds) || !seconds) return `0:00`;

  const minutes = Math.floor(seconds / 60);
  const formattedSeconds = Math.floor(seconds);

  return `${minutes}:${formattedSeconds}`;
};
